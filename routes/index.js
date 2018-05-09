var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var mongoClient = require("mongodb").MongoClient;
  mongoClient.connect(process.env.MongoDB, function (err, client) {
  
    const db = client.db('jokes');
    var collection = db.collection('jokes');

    collection.count()
      .then(function (count) { 

        var query = {};
        var random = Math.floor(Math.random() * count);
        console.log(random);
        var cursor = collection.find(query).limit(1).skip(random);
        cursor.toArray(function(err, jokes) {
          res.render('index', { Title: jokes[0].title, Body: jokes[0].body });
        });

      });
  });
});

module.exports = router;
