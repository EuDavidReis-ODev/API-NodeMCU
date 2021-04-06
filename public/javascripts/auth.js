 const firebase = require('./firebase_confg')
 const auth = firebase.auth()
 var logado = false

function newUserEmailPass(email,password){
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      // ...
      console.log("User::"+user)

    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode+"::"+errorMessage)
      // ..
    });
}

function loginUserEmailPass(email,password){
    auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    let user = userCredential.user;
    console.log("User::"+user)

    // ...
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode+"::"+errorMessage)

  });
}

function observeUserState(user){
    auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          let uid = user.uid;
          console.log("Usuario logado...")
          console.log("User::"+user)
          console.log("Id::"+uid)
          logado = true
          // ...
        } else {
          // User is signed out
          // ...
          console.log("Usuario deslogado...")
          logado = false

        }
      });
      
}

//loginUserEmailPass('eudavidreis34.dev@gmail.com','br100300')

module.exports = {auth,loginUserEmailPass,newUserEmailPass,logado}