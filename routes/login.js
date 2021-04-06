var express = require('express');
var router = express.Router();
const auth = require("../public/javascripts/auth")

/* GET users listing. */
router.get('/', function(req, res, next) {
  auth.loginUserEmailPass('eudavidreis34.dev@gmail.com','br100300')
  res.send('Logado...');
});

module.exports = router;
