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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const passwordController_1 = require("../controllers/passwordController");
exports.router = express_1.default.Router();
//Database connection
let dbObj;
database_1.db.then(() => dbObj = database_1.db).catch(err => console.log(err));
exports.router.get('/:userToken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, passwordController_1.getPasswords)(dbObj, req.params.userToken).then((result) => {
        res.send(result);
    });
}));
exports.router.post('/add/:userToken', (req, res) => {
    (0, passwordController_1.addPassword)(dbObj, req.body.service, req.body.username, req.body.password, req.params.userToken).then((result) => {
        res.json(result);
    });
});
exports.router.put('/update/:accountID', (req, res) => {
    (0, passwordController_1.updatePassword)(dbObj, req.params.accountID, req.body.service, req.body.username, req.body.password)
        .then(result => res.json(result)).catch(err => console.log(err));
});
exports.router.delete('/delete/:accountID', (req, res) => {
    (0, passwordController_1.deletePassword)(dbObj, req.params.accountID).then(result => res.json(result))
        .catch(err => res.json(err));
});
