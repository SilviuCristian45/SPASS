const ObjectID = require('mongodb').ObjectID; 

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

// input : db - database object
//         accountID - !!! the object we want to update
//         serviceName - google/facebook/instagram etc
//         username/email - based on the user account on that service
//         password - based on the user account 
// output : a promise containing the created password
function updatePassword(db, accountID,serviceName, username, password){
    return db.collection("passwords").findOneAndUpdate(
        {_id:ObjectID(accountID)},
        {
            $set : {
                service : serviceName,
                username : username,
                password : password
            }
        },
        {upsert: true}
    );
}

module.exports = {
    getPasswords,
    addPassword,
    updatePassword
}