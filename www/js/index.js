  var timeout = 50000;
  var admobid = {}
  if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-7091486462236476/9500431400',
      interstitial: 'ca-app-pub-7091486462236476/3962547158',
    }
  } 

  window.fn = {};

  window.fn.toggleMenu = function () {
    document.getElementById('appSplitter').right.toggle();
  };

  window.fn.loadView = function (index) {
    document.getElementById('appTabbar').setActiveTab(index);
    document.getElementById('sidemenu').close();
  };

  window.fn.loadLink = function (url) {
    window.open(url, '_blank');
  };

  window.fn.pushPage = function (page, anim) {
    if (anim) {
      document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
      document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
    }
  };

  // SCRIPT PARA CRIAR O MODAL DE AGUARDE
  window.fn.showDialog = function (id) {
    var elem = document.getElementById(id);      
    elem.show();            
  };

  //SCRIPT PARA ESCONDER O MODAL DE AGUARDE
  window.fn.hideDialog = function (id) {
    document.getElementById(id).hide();
  };

  var app = {
    // Application Constructor
    initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      document.addEventListener('admob.banner.events.LOAD_FAIL', this.bannerLoadFail.bind(this));
      document.addEventListener('admob.interstitial.events.LOAD_FAIL', this.interstitialLoadFail.bind(this));
      document.addEventListener('admob.interstitial.events.LOAD', this.interstitialLoad.bind(this));
      document.addEventListener('admob.interstitial.events.CLOSE', this.interstitialClose.bind(this));
    },
    // deviceready Event Handler    
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {          
      this.receivedEvent('deviceready');  
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      this.oneSignal();
      this.getIds();
      this.adMob();
    },
    bannerLoadFail: function(event) {
    },
    interstitialLoadFail: function(event) {
    },
    interstitialLoad: function(event) {
      document.getElementById('showAd').disabled = false;
    },
    interstitialClose: function(event) {
      admob.interstitial.prepare();
    },
    adMob: function() {
      admob.banner.config({
        id: admobid.banner,
        isTesting: false,
        autoShow: true,
      })
      admob.banner.prepare();

      admob.interstitial.config({
        id: admobid.interstitial,
        isTesting: false,
        autoShow: false,
      })
      admob.interstitial.prepare();

      document.getElementById('showAd').disabled = true;
      document.getElementById('showAd').onclick = function() {
        admob.interstitial.show();
      };
    },
    oneSignal: function() {
      window.plugins.OneSignal
        .startInit('d1797b39-26de-46b8-86ec-9539f8aabf2d')
        .handleNotificationOpened(function(jsonData) {
          var mensagem = JSON.parse(JSON.stringify(jsonData['notification']['payload']['body']));

          ons.notification.alert(
            mensagem,
            {title: 'Ola!'}
          );
        })
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();
    },
    //FUNÇÃO DE BUSCA
    onSearchKeyDown: function(id) {
      localStorage.removeItem("resultado_girias");
      if (id === '') {
        return false;
      }
      else{
        fn.showDialog('modal-aguarde');
        app.pesquisaGiriaEstado(id);
      }
    },
    buscaGiriaEstado: function(letra) {
      //admob.interstitial.show();
      $.ajax({
          url: "https://www.innovatesoft.com.br/webservice/giriasdecrente/buscaGiria.php",
          dataType: 'json',
          type: 'GET',
          timeout: parseInt(timeout),
          data: {
            'letra': letra
          },
          error: function(a) {
            var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
            ons.notification.alert("Não foi possível buscar as expressões no momento.",{title: 'Ops!'});
          },
          success: function(valorRetornado) {
            console.log(valorRetornado)
            var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
            if (valorRetornado == "ERROR") {
              ons.notification.alert("Não foi possível buscar as expressões.",{title: 'Ops!'});
            }
            else{  
              var obj = valorRetornado;
              if (obj) {
                for(var i in obj) {
                  var exemplo = '';

                  if (obj[i]['exemplo']) {
                    exemplo = obj[i]['exemplo'];
                  }
                  $('#conteudo_girias').append(
                    "<ons-card class='txt_giria' id='txt_giria"+i+"' marcado='0'>"+
                      "<div class='title'>"+
                        "<b style='text-transform:capitalize;'>"+obj[i]['giria'].toLowerCase()+"</b><br>"+
                        "<i style='font-size: 12px;'>"+obj[i]['dataregistro']+"</i><br>"+
                      "</div>"+
                      "<div class='content'>"+obj[i]['significado']+"<br><br><i style='font-size: 12px;'>"+exemplo+"</i></br></div>"+
                    "</ons-card>"
                  );
                }

                var qtd_marcado = 0;
                $( ".txt_giria" ).click(function() {
                  var marcado = $(this).attr('marcado');
                  var id = $(this).attr('id');          

                  if(parseInt(marcado) == 0) {
                    $(this).css("background","#f5f5f5");
                    $(this).attr('marcado',1);
                    qtd_marcado++;
                  }
                  else{
                    $(this).css("background","#fff");
                    $(this).attr('marcado',0);
                    qtd_marcado--;
                  }

                  if (parseInt(qtd_marcado) > 0) {
                    $(".copiar").css("display","");
                    $(".compartilha").css("display","");
                  }
                  else{
                    $(".copiar").css("display","none");
                    $(".compartilha").css("display","none");
                  }                    
                });
              }
            }
          },
      }); 
    },
    pesquisaGiriaEstado: function(pesquisa) {
      localStorage.setItem("resultado_girias", '[]');
      //admob.interstitial.show();
      $.ajax({
          url: "https://www.innovatesoft.com.br/webservice/giriasdecrente/buscaGiria.php",
          dataType: 'json',
          type: 'GET',
          timeout: parseInt(timeout),
          data: {
            'pesquisa': pesquisa
          },
          error: function(a) {
            var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
            fn.pushPage({'id': 'buscar.html', 'title': 'Resultado da pesquisa'});
            $('#resultado_girias').html("<ons-card><div class='title'>Ops!</div><div class='content'>Não encontramos nada parecido com essa expressão</div></ons-card>");
          },
          success: function(valorRetornado) { 
            fn.pushPage({'id': 'buscar.html', 'title': 'Resultado da pesquisa'});
            var timeoutID = 0;
            var obj = JSON.stringify(valorRetornado);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
            if (obj) {
              localStorage.setItem("resultado_girias", obj);
            }
          },
      }); 
    },
    ultimasGiriasCadastradas: function() {
      //admob.interstitial.show();
      $.ajax({
          url: "https://www.innovatesoft.com.br/webservice/giriasdecrente/ultimasGiriasCadastradas.php",
          dataType: 'json',
          type: 'GET',
          timeout: parseInt(timeout),
          data: {
            'ultimasGiriasCadastradas': 'sim'
          },
          error: function(a) {    
            console.log(a)      
            $('#ultimas_girias').append("<ons-card><div class='title'>Ops!</div><div class='content'>Nenhuma expressão cadastrada nos últimos dias.</div></ons-card>");
          },
          success: function(valorRetornado) { 
            var obj = valorRetornado;
            var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
            if (obj) {
              for(var i in obj) {
                $('#ultimas_girias').append(
                  "<ons-card>"+
                    "<div class='title'>"+obj[i]['giria']+"</div>"+
                    "<div class='content'>"+obj[i]['significado']+"</div>"+
                  "</ons-card>");
              }
            }
            else{
              $('#ultimas_girias').append("<ons-card><div class='title'>Ops!</div><div class='content'>Nenhuma expressão cadastrada nos últimos dias.</div></ons-card>");
            }
          },
      }); 
    },
    cadastraGiria: function(giria_input, significado_giria, letra, exemplo){
      //admob.interstitial.show();
      var userId = localStorage.getItem('userId');
      var pushToken = localStorage.getItem('pushToken');
      $.ajax({
          url: "https://www.innovatesoft.com.br/webservice/giriasdecrente/cadastraGiria.php",
          dataType: 'html',
          type: 'POST',
          timeout: parseInt(timeout),
          data: {
            'giria': giria_input,
            'significado': significado_giria,
            'exemplo': exemplo,
            'letra': letra,
            'userId': userId,
            'pushToken': pushToken,
            'dataregistro': this.dateTime(),
          },
          error: function(a) {
            console.log(a)
            var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
            ons.notification.alert("Não foi possível enviar sua expressão.",{title: 'Ops!'});
          },
          success: function(valorRetornado) {
            var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
            ons.notification.alert("Sua expressão foi cadastrada com sucesso. Ela estará disponível na letra '"+letra+"'.",{title: 'Parabéns!'});
          },
      });
      var timeoutID = 0;
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
      ons.notification.alert("Sua expressão foi cadastrada com sucesso. Ela estará disponível na letra '"+letra+"'.",{title: 'Parabéns!'});
    },
    getIds: function() {  
      var userId = window.localStorage.getItem('userId');
      alert('getIds()')
      alert(userId)
      if (!userId) {
        window.plugins.OneSignal.getIds(function(ids) {
          window.localStorage.setItem('userId', ids.userId);
          window.localStorage.setItem('pushToken', ids.pushToken);
        });       
        this.cadastraUser();
      }
    },
    cadastraUser: function() {
      var userId = window.localStorage.getItem('userId');
      var pushToken = window.localStorage.getItem('pushToken');
      alert('cadastraUser()')
      alert(userId)
      if (userId) {
        $.ajax({
          url: "https://www.innovatesoft.com.br/webservice/giriasdecrente/cadastraUser.php",
          dataType: 'html',
          type: 'POST',
          data: {
            'userId': userId,
            'pushToken': pushToken,
            'datacadastro': this.dateTime(),
          },
          error: function(a) {
            //alert(a);
          },
          success: function(valorRetornado) {
            //alert(valorRetornado);
          },
        });
      }
    },
    dateTime: function() {
      let now = new Date;
      let ano = now.getFullYear();
      let mes = now.getMonth() + 1;
      let dia = now.getDate();

      let hora = now.getHours();
      let min = now.getMinutes();
      let seg = now.getSeconds();

      return ano+'-'+mes+'-'+dia+' '+hora+':'+min+':'+seg;
    }
  };
  app.initialize();