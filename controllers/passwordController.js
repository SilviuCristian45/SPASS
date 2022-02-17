const ObjectID = require('mongodb').ObjectID; 

// input : db - database object
// output : a promise containing all the passwords from database 
async function getPasswords(db, userToken){
    const userID = await getUserID(db, userToken)
    const cursor = await db.collection("passwords").find({userid:userID})
    return cursor.toArray()
}

async function getUserID(db, userToken){
    const cursor = db.collection("tokens").find({token:userToken});
    const result = await cursor.toArray()
    return result[0].userid;
}

// input : db - database object
//         serviceName - google/facebook/instagram etc
//         username/email - based on the user account on that service
//         password - based on the user account 
//         userid - the user which created this account 
// output : a promise containing the flag if the password was added or not 
async function addPassword(db, serviceName, username, password, userToken){
    const userid = await getUserID(db, userToken);
    newAccount = {
        service:serviceName,
        username:username,
        password:password,
        userid:userid
    }
    const flag = await db.collection("passwords").insertOne(newAccount);
    return JSON.parse(flag).ok;
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