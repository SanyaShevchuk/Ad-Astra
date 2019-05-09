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
    var cursor = db.collection('article').find({'topic':req.query.name}).sort({date:-1});
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
    var cursor = db.collection('article').find({'region':req.query.name}).sort({date:-1});
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
    let cursor = db.collection('article').aggregate(
        [
            {$match:{id: Number(req.query.id)}},
            {$project:
                  { _id:0,
                    id:1,
                    title:1,
                    text:1,
                    description:1,
                    subtopic:1,
                    region:1,
                    topic:1,
                    author:1,
                    photoresource:1,
                    date:
                        {$dateToString:
                              {format:"%d.%m.%Y", date:"$date"}
                        }
                  }
            },
            {$sort:{id:-1}}
            ]);
    cursor.forEach(function(doc){
      if(!doc){
        throw new Error('No record found.');
      }
      news = doc;
      res.render('article', {news:news});
      db.close();
    });
    // var cursor = db.collection('article').findOne({'id': Number(req.query.id)})
    //     .then(function(doc){
    //       if(!doc){
    //         throw new Error('No record found.');
    //       }
    //       news = doc;
    //       res.render('article', {news: news});
    //     });
    // db.close();
  })
});

router.get('/spec-project', function(req, res, next) {
  mongo.connect(url, function(err, db){
    var news = [];
    assert.equal(null, err);
    var cursor = db.collection('specprojects').find({'specproject':req.query.name}).sort({date:-1});
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      news.push(doc);
    }, function(){
      db.close();
      res.render('specproject', {news:news});
    })
  })
});

router.get('/project', function(req, res, next) {
  mongo.connect(url, function (err, db) {
    var news;
    assert.equal(null, err);
    let cursor = db.collection('specprojects').aggregate(
        [
          {$match:{id: Number(req.query.id)}},
          {$project:
                { _id:0,
                  id:1,
                  title:1,
                  text:1,
                  description:1,
                  subtopic:1,
                  author:1,
                  specproject:1,
                  photoresource:1,
                  date:
                      {$dateToString:
                            {format:"%d.%m.%Y", date:"$date"}
                      }
                }
          },
          {$sort:{id:-1}}
        ]);
    cursor.forEach(function(doc){
      if(!doc){
        throw new Error('No record found.');
      }
      news = doc;
      res.render('project', {news:news});
      db.close();
    });
  })
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts');
});

router.get('/statut', function(req, res, next) {
  res.render('statut');
});

router.get('/team', function(req, res, next) {
  mongo.connect(url, function(err,db){
    let experts = [];
    let cursor = db.collection('experts').find().sort({id:1});
    cursor.forEach(function(doc, err){
      experts.push(doc);
    }, function(){
      db.close();
      res.render('team', {experts:experts});
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
    let cursor= db.collection('article').find({expert:{$exists:false}}).sort({date:-1}).limit(8);
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      // if(doc.expert) experts.push(doc)
      if(i==0) {
        main_news = doc;
        i++;
      }
      else if(i==1) {
        second_news = doc;
        i++;
      }
      else other_news.push(doc);

    }, function() {

      let cursor1= db.collection('article').find({expert:{$exists:true}}).sort({date:-1}).limit(3);
      cursor1.forEach(function(doc, err){
        assert.equal(null, err);
        experts.push(doc);
      }, function () {
        db.close();
        res.render('layout.hbs', {other_news: other_news, main_news: main_news, second_news: second_news, experts:experts});
      })
    });
  });
});

router.get('/admin', function(req, res, next){
    res.render('admin/admin');
})

router.post('/insert', function(req, res, next) {
    let collection;
    var item = {
        description: req.body.description
    };
    if(req.body.name){
      item.id = parseFloat(req.body.id);
      item.name = req.body.name;
      collection = "experts";
    } else {
        item.title = req.body.title;
        item.text = req.body.text;
        item.author = req.body.author;
        item.subtopic = req.body.subtopic;
        item.date = req.body.date;
        item.photoresource = req.body.photoresource;

        if(req.body.region || req.body.topic){
            item.topic = req.body.topic;
            item.region = req.body.region;
            item.id = parseFloat(req.body.id)

            collection = "article";
            if(req.body.expert){
                item.expert = req.body.expert;
            }
        } else {
            if(req.body.specproject){
                item.id = parseFloat(req.body.id);
                item.specproject = req.body.specproject;
                collection = "specprojects";
            } else if(req.body.text){
                    item.id = req.body.id;
                    item.specproject = req.body.specproject;
                    collection = "article";
            }
        }
    }

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection(collection).insertOne(item, function(err, result) {
      assert.equal(null, err);
        console.log("Object is inserted");
      db.close();
    });
  });

  res.redirect('/admin');
});

router.post('/get', function (req, res, next) {
   res.redirect("/"+req.body['get-elem']+"?id="+req.body.id);
});

router.post('/delete', function (req, res, next) {
    let collection;
    let id;
    if("article-topic" === req.body['delete-elem']) {
        id = req.body.id;
        collection = "article";
    } else {
        id= parseFloat(req.body.id);
        collection = req.body['delete-elem'];
    }
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection(collection).deleteOne({id: id}, function(err, result) {
            assert.equal(null, err);
            console.log("Object is deleted");
            db.close();
        });
    });
    res.redirect('/admin');
});

/**
 * req.body.? - whatevs element in the form, which sent request
 * ? - name tag of element
 * */
router.post('/update', function(req, res, next){

    let collection;
    let id;
    let item = {};

    if(req.body['update-elem'] ==='spec-project-topic'){
        id = req.body.updateId;
    } else {
        id = parseFloat(req.body.updateId);
    }

    if(req.body['update-elem'] ==='spec-project-article'){
        collection = 'specprojects';
    } else if(req.body['update-elem'] ==='experts'){
        collection = 'experts';
    } else {
        collection = 'article';
    }

    if(req.body.id){
        if(req.body['update-elem'] === 'spec-project-topic'){
            item.id = req.body.id;
        }
        else item.id = parseFloat(req.body.id);
    }

    if(req.body.title){
        item.title = req.body.title;
    }
    if(req.body.name){
        item.name = req.body.name;
    }
    if(req.body.description){
        item.description = req.body.description;
    }
    if(req.body.author){
        item.author = req.body.author;
    }
    if(req.body.expert){
        item.expert = req.body.expert;
    }
    if(req.body.date){
        item.date = req.body.date;
    }
    if(req.body.topic){
        item.topic = req.body.topic;
    }
    if(req.body.region){
        item.region = req.body.region
    }
    if(req.body.specproject){
        item.specproject = req.body.specproject;
    }
    if(req.body.subtopic){
        item.subtopic = req.body.subtopic;
    }
    if(req.body.photoresource){
        item.photoresource = req.body.photoresource;
    }
    if(req.body.text){
        item.text = req.body.text;
    }

   mongo.connect(url, function(err, db){
       assert.equal(null, err);
       db.collection(collection).updateOne({id: id}, {$set:item}, function(err, result){
           assert.equal(null, err);
           console.log("Object is updated");
           db.close();
       })
   });

   res.redirect('/admin');
});

module.exports = router;
