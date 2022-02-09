const express = require('express');
const router = express.Router()

//Database connection
let dbObj;
require('../database').then( db => dbObj = db);

// input : db - database object
// output : a promise containing all the passwords from database 
async function getPasswords(db){
    const cursor = db.collection("passwords").find({});
    const result = await cursor.toArray()
    return result
}

// input : db - database object
//         serviceName - google/facebook/instagram etc
//         username/email - based on the user account on that service
//         password - based on the user account 
//         userid - the user which created this account 
// output : a promise containing the created password
function addPassword(db, serviceName, username, password, userid){
    newAccount = {
        service:serviceName,
        username:username,
        password:password,
        userid:userid
    }
    return new Promise( (resolve, reject) => { 
        db.collection("passwords").insertOne(newAccount, (err, res) => {
        if(err) reject(err);
        return resolve('succes')
        });
    });
}

router.get('/', async (req, res) => {
    getPasswords(dbObj).then( (result) => {
        res.send(result);
    })
});

router.post('/add/:userid', (req, res) => {
    addPassword(dbObj, req.body.service, req.body.username, req.body.password, req.params.userid).then( (result) => {
        res.json(result)
    });
});


module.exports = router;