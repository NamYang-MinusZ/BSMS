let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let fs = require('fs');
let app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'BSMS';

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    console.log('클라이언트 입장.');
});

app.post('/login',(req,res) => {

    let ID_INPUT = req.body.ID;
    let PW_INPUT = req.body.PASSWORD;

    console.log('입력받은 아이디와 비밀번호 :' + ID_INPUT + " 과 " + PW_INPUT);

    MongoClient.connect(url , (err,client) => {
        assert.equal(null,err);

        const db = client.db(dbName);

        db.collection('users').find({USERNAME : ID_INPUT , PASSWORD : PW_INPUT}).toArray((err,docs) => {
            assert.equal(null,err);
            console.log('로그인 성공.');
            res.redirect('/system');
        })

        client.close();
    })

});

app.get('/system',(req,res) => {

    fs.readFile(path.join(__dirname,'/public/system.html'),(err,data) => {
        assert.equal(null,err);
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.end(data); 
    });

})

app.get('/system/cardcall',(req,res) => {
    let CALL_NUM = req.query.call_num;
    // console.log(CALL_NUM);

    MongoClient.connect(url , (err,client) => {
        assert.equal(null,err);

        const db = client.db(dbName);

        db.collection('busstop').find({}).limit(18).toArray((err,docs)=>{
            res.json(docs);
        })

        client.close();
    })

})

app.post('/system/get_bs_data',(req,res) => {

   let BS_ID = req.body.BS_ID;
   console.log('BS_ID : ' + BS_ID);

   MongoClient.connect(url , (err,client) => {

        assert.equal(null,err);

        const db = client.db(dbName);

        db.collection('busstop').find({BS_ID : BS_ID}).toArray((err,docs) => {
            res.json(docs);
        })

        client.close();

   })
   
})

app.listen(3000,()=>{
    console.log('The Server is listening on port 3000!!!')
});

