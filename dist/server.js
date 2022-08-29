"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const passwords_1 = require("./routes/passwords");
const auth_1 = require("./routes/auth");
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/passwords', passwords_1.router);
app.use('/users', auth_1.router);
app.listen(3000, () => {
    console.log('server has started');
});
