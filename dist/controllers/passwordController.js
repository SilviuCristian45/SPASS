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
exports.deletePassword = exports.updatePassword = exports.addPassword = exports.getPasswords = void 0;
const ObjectID = require('mongodb').ObjectID;
const utilController = require('./utilController');
const validateAccount = utilController.validateAccount;
// input : db - database object
// output : a promise containing all the passwords from database 
function getPasswords(db, userToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = yield getUserID(db, userToken);
        try {
            const cursor = yield db.collection("passwords").find({ userid: userID });
            const result = yield cursor.toArray();
            if (result.length == 0)
                return 'no passwords';
            return result;
        }
        catch (error) {
            return 'fail to get passwords based on your token';
        }
    });
}
exports.getPasswords = getPasswords;
function getUserID(db, userToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cursor = db.collection("tokens").find({ token: userToken });
            const result = yield cursor.toArray();
            return result[0].userid;
        }
        catch (error) {
            return 'fail to get user ID based on your token';
        }
    });
}
// input : db - database object
//         serviceName - google/facebook/instagram etc
//         username/email - based on the user account on that service
//         password - based on the user account 
//         userid - the user which created this account 
// output : a promise containing the flag if the password was added or not 
function addPassword(db, serviceName, username, password, userToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const userid = yield getUserID(db, userToken);
        const newAccount = {
            service: serviceName,
            username: username,
            password: password,
            userid: userid
        };
        if (validateAccount(newAccount)) {
            const flag = yield db.collection("passwords").insertOne(newAccount);
            return JSON.parse(flag);
        }
        return 'No valid data';
    });
}
exports.addPassword = addPassword;
// input : db - database object
//         accountID - !!! the object we want to update
//         serviceName - google/facebook/instagram etc
//         username/email - based on the user account on that service
//         password - based on the user account 
// output : a promise containing the updated password
function updatePassword(db, accountID, serviceName, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db.collection("passwords").findOneAndUpdate({ _id: ObjectID(accountID) }, {
            $set: {
                service: serviceName,
                username: username,
                password: password
            }
        }, { upsert: false, returnOriginal: false } //return the updated document
        );
        return result.value;
    });
}
exports.updatePassword = updatePassword;
// input : db - database object
//         accountID - !!! the document id  we want to delete
// output : a promise containing the result of the query
function deletePassword(db, accountID) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(accountID)
        const result = yield db.collection("passwords").deleteOne({ _id: ObjectID(accountID) });
        return { message: result.deletedCount };
    });
}
exports.deletePassword = deletePassword;
