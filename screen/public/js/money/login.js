var vConsole = new VConsole();
var loginForm = document.getElementById("login-form");
var loginRow = document.getElementById("login-row");
var gamePage = document.getElementById("game-page");
var userList = document.getElementById("user-list");
var loginBtn = document.getElementById("login-btn");


loginBtn.addEventListener("click",function(e){
    e.preventDefault();
    var userName = document.getElementById("username").value;
    $.ajax({
        type: 'POST',
        url: "/client/verifyUser",
        data: {
            "username":userName
        },
        success: function(data){
            if(data.status == -1){
                console.log(data);
                alert("用户名密码错误");
            }else{
                window.location = "/userManager";
            }
        }
    })
   
})
