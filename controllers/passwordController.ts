const ObjectID = require('mongodb').ObjectID; 
const utilController = require('./utilController');
const validateAccount = utilController.validateAccount;

// input : db - database object
// output : a promise containing all the passwords from database 
export async function getPasswords(db: any, userToken: string){
    const userID = await getUserID(db, userToken)
    try {
        const cursor = await db.collection("passwords").find({userid:userID})
        const result = await cursor.toArray();
        if(result.length == 0)
            return 'no passwords';
        return result;
    } catch (error) {
        return 'fail to get passwords based on your token'
    }
}

async function getUserID(db: any, userToken: string){
    try {
        const cursor = db.collection("tokens").find({token:userToken});
        const result = await cursor.toArray()
        return result[0].userid;
    } catch (error) {
        return 'fail to get user ID based on your token'
    }
}

// input : db - database object
//         serviceName - google/facebook/instagram etc
//         username/email - based on the user account on that service
//         password - based on the user account 
//         userid - the user which created this account 
// output : a promise containing the flag if the password was added or not 
export async function addPassword(db: any, serviceName: string, username: string, password: string, userToken: string){
    const userid = await getUserID(db, userToken);
    const newAccount = {
        service:serviceName,
        username:username,
        password:password,
        userid:userid
    }
    if(validateAccount(newAccount)){
        const flag = await db.collection("passwords").insertOne(newAccount);
        return JSON.parse(flag);
    }

    return 'No valid data';
    
}

// input : db - database object
//         accountID - !!! the object we want to update
//         serviceName - google/facebook/instagram etc
//         username/email - based on the user account on that service
//         password - based on the user account 
// output : a promise containing the updated password
export async function updatePassword(db: any, accountID: string,serviceName: string, username: string, password: string){
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
export async function deletePassword(db: any, accountID: string){
    //console.log(accountID)
    const result = await db.collection("passwords").deleteOne({_id : ObjectID(accountID)});
    return {message:result.deletedCount}
}
