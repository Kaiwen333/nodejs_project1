var fs = require("fs");
var fileUrl = "./public/user.txt"


//保存信息
exports.save = function save(data,callback){
    fs.appendFile(fileUrl,data,callback)
}
