var express = require('express');
var router = express.Router();
const auth = require("../public/javascripts/auth")


router.get('/', function(req, res, next) {
  auth.loginUserEmailPass('YourFirebaseEmail@email.com','YOURPASS123')
  res.send('Logado...');
});

module.exports = router;
