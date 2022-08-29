"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
let dbObj;
const database_1 = require("../database");
database_1.db.then(db => dbObj = db).catch(err => console.log(err));
//login 
exports.router.post('/login', (req, res) => {
    (0, authController_1.logUser)(dbObj, req.body.email, req.body.password).then(result => res.json(result));
});
//register
exports.router.post('/register', (req, res) => {
    (0, authController_1.registerUser)(dbObj, req.body.email, req.body.password).then(result => res.json(result));
});
