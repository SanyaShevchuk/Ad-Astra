var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

// var url = 'mongodb://sheva:sheva@localhost:27017/adastra';
var url = 'mongodb://localhost:27017/adastra';


router.get('/topic', function(req,res,next){
  mongo.connect(url, function(err, db){
    var news = [];
    assert.equal(null, err);
    var cursor = db.collection('article').find({'topic':req.query.name});
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      news.push(doc);
    }, function(){
      db.close();
      res.render('topic', {news:news});
    })
  })
})

router.get('/region', function(req,res,next){
  mongo.connect(url, function(err, db){
    var news = [];
    assert.equal(null, err);
    var cursor = db.collection('article').find({'region':req.query.name});
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      news.push(doc);
    }, function(){
      db.close();
      res.render('region', {news:news});
    })
  })
})

router.get('/article', function(req, res, next) {
  mongo.connect(url, function (err, db) {
    var news;
    assert.equal(null, err);
    var cursor = db.collection('article').findOne({'id': Number(req.query.id)})
        .then(function(doc){
          if(!doc){
            throw new Error('No record found.');
          }
          news = doc;
          res.render('article', {news: news});
        });
    db.close();
  })
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts');
});

router.get('/aboutus', function(req, res, next) {
  mongo.connect(url, function(err,db){
    let experts = [];
    let cursor = db.collection('experts').find().sort({id:1});
    cursor.forEach(function(doc, err){
      experts.push(doc);
    }, function(){
      db.close();
      res.render('aboutus', {experts:experts});
    })
  })
});

router.get('/', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    let main_news, second_news = {};
    let other_news = [];
    let experts = [];
    assert.equal(null, err);
    let i=0;
    let cursor= db.collection('article').find().sort({date:-1});
//{expert:{$exists:false}}
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      if(doc.expert) experts.push(doc)
      else if(i==0) {
        main_news = doc;
        i++;
      }
      else if(i==1) {
        second_news = doc;
        i++;
      }
      else other_news.push(doc);

    }, function() {
      db.close();
      res.render('index', {other_news: other_news, main_news: main_news, second_news: second_news, experts:experts});
    });
  });
});

// router.post('/insert', function(req, res, next) {
//   var item = {
//     title: req.body.title,
//     content: req.body.content,
//     author: req.body.author
//   };
//
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('user-data').insertOne(item, function(err, result) {
//       assert.equal(null, err);
//       console.log('Item inserted');
//       db.close();
//     });
//   });
//
//   res.redirect('/');
// });

module.exports = router;
