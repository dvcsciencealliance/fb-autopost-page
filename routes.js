var express = require('express');
var router = express.Router();

router.get('/welcome', function(req, res) {
  res.render('index');
});

router.post('/authenticate', function(req, res) {
  
});

module.exports = router;
