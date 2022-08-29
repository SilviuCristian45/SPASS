"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.logUser = void 0;
const ObjectID = require('mongodb').ObjectID;
const getRandomValues = require('get-random-values');
// input : db - database object
//         email - the email sent through body
//         password - the password sent through body 
// output : a promise containing the authentication token - (the user's id )
function logUser(db, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const cursor = yield db.collection("users").find({ email: email }); //memorize the db cursor returned by find 
        const result = yield cursor.toArray(); //store as array the cursor result 
        if (result.length > 0) { //if we have any records
            for (let index = 0; index < result.length; index++) { //go through the array 
                if (result[index].password == password) { //if the password matches anything 
                    //return the token as js object 
                    const userid = result[index]._id;
                    //query the tokens collection
                    const cursor2 = yield db.collection("tokens").find({ userid: userid });
                    const result2 = yield cursor2.toArray();
                    return { token: result2[0].token }; //return token
                }
            }
        }
        return { error: 'not logged' };
    });
}
exports.logUser = logUser;
// input : db - database object
//         email - the email sent through body
//         password - the password sent through body 
// output : a promise containing the authentication token - (the user's id )
function registerUser(db, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const registeredUser = yield db.collection("users").insertOne({ email: username, password });
            const token = getToken(20);
            const newToken = yield db.collection("tokens").insertOne({
                userid: registeredUser.insertedId,
                token: token
            });
            return { token: token };
        }
        catch (error) {
            return { error: error.message };
        }
    });
}
exports.registerUser = registerUser;
function getToken(length) {
    let token = new Uint8Array(length);
    return getRandomValues(token).toString();
}
