var admobid = {}
if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
  admobid = {
    banner: 'ca-app-pub-7091486462236476/9500431400',
    interstitial: 'ca-app-pub-7091486462236476/3962547158',
  }
} 

document.addEventListener('deviceready', function() {
  alert('OneSignal')
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

  admob.banner.config({
    id: admobid.banner,
    isTesting: false,
    autoShow: true,
  })
  admob.banner.prepare()

  admob.interstitial.config({
    id: admobid.interstitial,
    isTesting: false,
    autoShow: false,
  })
  admob.interstitial.prepare()

  document.getElementById('showAd').disabled = true
  document.getElementById('showAd').onclick = function() {
    admob.interstitial.show()
  }


}, false);

document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
  console.log(event)
});

document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
  console.log(event)
});

document.addEventListener('admob.interstitial.events.LOAD', function(event) {
  console.log(event)
  document.getElementById('showAd').disabled = false
});

document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
  console.log(event)

  admob.interstitial.prepare()
});