var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParse = require('body-parser');
const assert = require('assert');
var app = express();
const port = 7070;
const url = 'mongodb://localhost:27017';
const dbName = 'test';

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.listen(port,function(){
  console.log("server listening to "+port+"...");
});

app.get('/',function(req,res){
  //do something here
});

app.get('/send-data',function(req,res){
  //do something here
});
app.post('/get-data',function(req,res){
  var insertArray = [];
  MongoClient.connect(url,function(err,client){
    const myDB = client.db(dbName);
    var datas = myDB.collection('users').find();
    datas.forEach(function(err,data){
      insertArray.push(data);
    },function(){
      res.json(insertArray);
      client.close();
    });
  });
});

app.get('/get-data',function(req,res){
  var insertArray = [];
  MongoClient.connect(url,function(err,client){
    assert.equal(null,err);
    const myDB = client.db(dbName);
    var datas = myDB.collection('users').find();
    datas.forEach(function(data,err){
      assert.equal(null,err);
      insertArray.push(data);
    },function(){
      res.json(insertArray);
      client.close();
    });
  });
});

app.post('/send-data',function(request , response){
  var item = {
    name: request.body.name,
    family: request.body.family,
    age: request.body.age
  };
  MongoClient.connect(url,function(err, client){
    assert.equal(null,err);
    const db = client.db(dbName);
    db.collection('users').insertOne(item,function(err,result){
      client.close();
    });
  });
});
