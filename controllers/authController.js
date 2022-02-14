const ObjectID = require('mongodb').ObjectID; 
const getRandomValues = require('get-random-values')

// input : db - database object
//         email - the email sent through body
//         password - the password sent through body 
// output : a promise containing the authentication token - (the user's id )
async function logUser(db, email, password){
    const cursor = await db.collection("users").find({email:email}) //memorize the db cursor returned by find 
    const result = await cursor.toArray() //store as array the cursor result 

    if(result.length > 0){ //if we have any records
        for (let index = 0; index < result.length; index++) {  //go through the array 
            if(result[index].password == password) //if the password matches anything 
                return {token : result[index]._id};  //return the token as js object 
        }
    }

    return {error:'not logged'};
}

// input : db - database object
//         email - the email sent through body
//         password - the password sent through body 
// output : a promise containing the authentication token - (the user's id )
async function registerUser(db, username, password){
    try {
        const registeredUser = await db.collection("users").insertOne({email:username, password});
        const token = getToken(20)
        const newToken = await db.collection("tokens").insertOne({
            userid : registeredUser.insertedId,
            token : token
        });
        return {token : token}
    } catch (error) {
        return {error: error.message}
    }
}

function getToken(length){
    let token = new Uint8Array(length);
    return getRandomValues(token).toString();
}

module.exports = {
    logUser,
    registerUser
}