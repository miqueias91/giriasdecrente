 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCt8lZkhRajeRnj8LtCHc1DnRqF2VB75Mo",
    authDomain: "girias-de-crente.firebaseapp.com",
    databaseURL: "https://girias-de-crente.firebaseio.com",
    projectId: "girias-de-crente",
    storageBucket: "girias-de-crente.appspot.com",
    messagingSenderId: "846537380465",
    appId: "1:846537380465:web:f4891310ceece093a4c1d0",
    measurementId: "G-WJ1Y7E1SWM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // GRAVAR DADOS
  /*firebase.database().ref('giriasdecrente_users').child(1).set({
    id_user: '1',
    userId: '4b4e5fef-fb0c-4327-b3bb-c3d739d472e7',
    pushToken: 'cBfdFDA6xvg:APA91bH_M6D7xO39WdtFnWEAFDMhl4VoP4rK2RcKCJsM62a8vDkbrzMk5rUNL1R8RrjV5vcRfzAuao0EP6Axp55ZbXeiWRgvQQCPx2zeB056r2GOQMrOKSW5wyVU3OOoE3ZNpq-ejHCI',
    alertado: 'sim',
    datacadastro: '2019-09-13 13:54:30'
  });*/

  // LER DADOS
  /*firebase.database().ref('giriasdecrente_users').child(1).child('id_user').on('value', (snapshot) => {
    var id_user = snapshot.val();
    console.log(id_user)
  });*/

  /*firebase.database().ref('giriasdecrente_users').child(1).child('id_user').once('value').then(function(snapshot) {
    var id_user = (snapshot.val());
    console.log(id_user);
  });*/

  // ALTERANDO DADOS
  // firebase.database().ref('giriasdecrente_users').child(1).child('id_user').set('2');

  // REMOVENDO DADOS
  // firebase.database().ref('giriasdecrente_users').child(1).remove();


  /*var giriasdecrente_users = firebase.database().ref('giriasdecrente_users');
  var chave = giriasdecrente_users.push().key;
  console.log(chave);*/