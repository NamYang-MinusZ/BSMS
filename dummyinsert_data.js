const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'BSMS';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  for (let index = 1; index <= 99; index++) {

      let BS_OBJECT = {};

      let BS_ID = "";
      let BS_CO_HISTORY = [];
      let BS_POS = "와부읍";

      if(index < 10){
        BS_ID = 'BS-00'.concat((index).toString());
      }
      
      else{
        BS_ID = 'BS-0'.concat((index).toString()); 
      };
      
      for (let index = 0; index <= 23; index++) {
          BS_CO_HISTORY.push(parseInt((Math.random()*50)+1));
      };

      BS_OBJECT.BS_ID = BS_ID;
      BS_OBJECT.BS_CO_HISTORY = BS_CO_HISTORY;
      BS_OBJECT.BS_POS = BS_POS;

      db.collection('busstop').insertOne(BS_OBJECT,(err,result) => {
        assert.equal(null,err);
        assert.equal(1,result.insertedCount);
    });
  }
  client.close();
});
