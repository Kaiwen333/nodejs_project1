
var showIndex = function(req,res){
    res.render("index");
}
var bigScreen = function(req,res){
    res.render("bigscreen");
}

exports.showIndex = showIndex;      //首页
exports.bigScreen = bigScreen;      //大屏页面