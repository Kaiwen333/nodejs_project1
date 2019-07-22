var userSQL = {  
    insert:'INSERT INTO user(name,password) VALUES(?,?)', 
    delUser:'DELETE FROM user WHERE Id = ?',  
    queryAll:'SELECT * FROM user',
    getUserInfo:'SELECT * FROM user WHERE name = ?  AND password = ?',
  };
module.exports = userSQL;