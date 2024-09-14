var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/post', function(req, res, next) {
  res.write("Post page")
});

module.exports = router;
