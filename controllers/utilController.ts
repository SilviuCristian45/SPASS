export function validateAccount(account: any){
    const {service, username, password, userid} = account
    //console.log(typeof(service.length));
    return !(service.length == 0 || username.length == 0 || password.length == 0);
}