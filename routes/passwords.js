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
// output : a promise containing all the passwords from database 
async function addPassword(db){

}

router.get('/', async (req, res) => {
    getPasswords(dbObj).then( (result) => {
        res.send(result);
    })
});


module.exports = router;