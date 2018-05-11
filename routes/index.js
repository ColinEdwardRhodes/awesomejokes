var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // access pooled connection through req.app.locals
  const db = req.app.locals.db('jokes');
  var collection = db.collection('jokes');

  collection.count()
    .then(function (count) { 
        
      var random = Math.floor(Math.random() * count);
        
      collection.find({}).limit(1).skip(random).toArray(function(err, jokes) {

        var body = jokes[0].body.replace("\r\n", "<br/>");
        console.log(body);
        res.render('index', { Title: jokes[0].title, Body: body });
     });
    });
  });

module.exports = router;
