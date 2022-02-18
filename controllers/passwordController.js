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
async function updatePassword(db, accountID,serviceName, username, password){
    const result =  await db.collection("passwords").findOneAndUpdate(
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
    return result.value;
}

// input : db - database object
//         accountID - !!! the document id  we want to delete
// output : a promise containing the result of the query
async function deletePassword(db, accountID){
    //console.log(accountID)
    const result = await db.collection("passwords").deleteOne({_id : ObjectID(accountID)});
    return {message:result.deletedCount}
}

module.exports = {
    getPasswords,
    addPassword,
    updatePassword,
    deletePassword
}