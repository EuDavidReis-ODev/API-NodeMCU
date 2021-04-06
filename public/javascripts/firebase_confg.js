const firebase = require("firebase");


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwU-j_VtWK66kq-d6kzuC0Chafm4mOBuY",
    authDomain: "nodemcu-api.firebaseapp.com",
    projectId: "nodemcu-api",
    storageBucket: "nodemcu-api.appspot.com",
    messagingSenderId: "836998979874",
    appId: "1:836998979874:web:a0b193fb63715e1372457b",
    measurementId: "G-B8GSG26BDV"
  };

  firebase.initializeApp(firebaseConfig);

  module.exports = firebase