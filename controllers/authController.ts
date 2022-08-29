const ObjectID = require('mongodb').ObjectID; 
const getRandomValues = require('get-random-values')

// input : db - database object
//         email - the email sent through body
//         password - the password sent through body 
// output : a promise containing the authentication token - (the user's id )
export async function logUser(db: any, email: string, password: string): Promise<any>{
    const cursor = await db.collection("users").find({email:email}) //memorize the db cursor returned by find 
    const result = await cursor.toArray() //store as array the cursor result 

    if(result.length > 0){ //if we have any records
        for (let index = 0; index < result.length; index++) {  //go through the array 
            if(result[index].password == password){ //if the password matches anything 
                //return the token as js object 
                const userid = result[index]._id;
                //query the tokens collection
                const cursor2 = await db.collection("tokens").find({userid: userid})
                const result2 = await cursor2.toArray()
                return {token : result2[0].token} //return token
            }
        }
    }
    return {error:'not logged'};
}

// input : db - database object
//         email - the email sent through body
//         password - the password sent through body 
// output : a promise containing the authentication token - (the user's id )
export async function registerUser(db: any, username: string, password: string){
    try {
        const registeredUser = await db.collection("users").insertOne({email:username, password});
        const token = getToken(20)
        const newToken = await db.collection("tokens").insertOne({
            userid : registeredUser.insertedId,
            token : token
        });
        return {token : token}
    } catch (error: any) {
        return {error: error.message}
    }
}

function getToken(length: number){
    let token = new Uint8Array(length);
    return getRandomValues(token).toString();
}