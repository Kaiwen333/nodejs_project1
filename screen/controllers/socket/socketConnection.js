
exports.disconnect = function(userName,connectedUser,callback){
    if (userName) {
        connectedUser.splice(connectedUser.indexOf(userName), 1);
    }
    callback();
}
exports.login = function(userName,_userName,connectedUser,callback){
    if(_userName.trim().length == 0){
        return;
    }
    connectedUser.push(userName);
    callback();
}
