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
// output : a promise containing the updated password
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
        {upsert: false, returnOriginal:false} //return the updated document
    );
}

// input : db - database object
//         accountID - !!! the document id  we want to delete
// output : a promise containing the result of the query
function deletePassword(db, accountID){
    return db.collection("passwords").deleteOne({_id:ObjectID(accountID)})
}

module.exports = {
    getPasswords,
    addPassword,
    updatePassword,
    deletePassword
}