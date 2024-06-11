
function login(){

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let u ={
        "username": username,
        "password": password
    }

    $.ajax({

        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",

        data: JSON.stringify(u),
        url: "http://localhost:8080/login",
        success: function (dulieu) {

            localStorage.setItem("u", JSON.stringify(dulieu));
            window.location.href = "../admin/students-per-teacher"
        }
    })
}
