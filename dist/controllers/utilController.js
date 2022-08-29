"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccount = void 0;
function validateAccount(account) {
    const { service, username, password, userid } = account;
    //console.log(typeof(service.length));
    return !(service.length == 0 || username.length == 0 || password.length == 0);
}
exports.validateAccount = validateAccount;
