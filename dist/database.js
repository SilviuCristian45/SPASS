"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
const url = "mongodb://localhost:27017";
function connect() {
    return new Promise((resolve, reject) => {
        mongodb_1.default.connect(url, function (err, client) {
            if (err)
                return reject(err);
            return resolve(client.db("spass"));
        });
    });
}
exports.db = connect();
