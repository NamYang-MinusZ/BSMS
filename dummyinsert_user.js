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
  
  let USER_OBJECT = {

      USERNAME : '함성준',
      PASSWORD : '1q2w3e4r'
      
  }

  db.collection('users').insertOne(USER_OBJECT,(err,result) => {
    assert.equal(null,err);
    assert.equal(1,result.insertedCount);
  });

  client.close();
});
