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

  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      alert('uid: '+uid)
    }
  });   