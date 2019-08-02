// var vConsole = new VConsole();

var loginBtn = document.getElementById("login-btn");


loginBtn.addEventListener("click",function(e){
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    $.ajax({
        type: 'POST',
        url: "/client/verifyUser",
        data: {
            "username":username,
            "password":password
        },
        success: function(data){
            if(data.status == 1){
                window.location = "/client/money";
            }else{
                alert(data.msg);
            }
        }
    })
   
})
