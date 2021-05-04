const firebase = require("firebase");


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//REPLACE WITH YOUR CONFIG.
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  firebase.initializeApp(firebaseConfig);

  module.exports = firebase