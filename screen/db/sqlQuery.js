exports.userSQL = {  
    getUserInfo:'SELECT * FROM test WHERE username = ?  AND password = ?',
    userExist:'SELECT * FROM user WHERE openid = ? ',
    addUser:'INSERT INTO user(openid,nickname,sex,city,province,country,headimgurl) VALUES(?,?,?,?,?,?,?)'
};


