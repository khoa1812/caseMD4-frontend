let us = docLocalStorage();
if (us == null) {
    window.location.href = "../login/login.html";
}
let token = us.token;

function docLocalStorage() {
    let userString = localStorage.getItem("u");
    let user = JSON.parse(userString);
    return user;
}

function addNewUser(event) {
    event.preventDefault();

    let username = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    let phoneNumber = $('#phoneNumber').val();
    let fullName = $('#fullName').val();
    let dateOfBirth = $('#dateOfBirth').val();
    let address = $('#address').val();
    let identity = $('#identity').val();
    let enabled = $('#enabled').val();
    let id = $('#id').val();
    let roles  = {
        id: id
    };

    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
    }

    let newUser = {
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        address: address,
        identity: identity,
        enabled: enabled,
        roles: roles
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        type: "POST",
        data: JSON.stringify(newUser),
        url: "http://localhost:8080/admin/register",
        success: function() {
            successHandler();
            displayFormCreate();
        },
        error: function() {
            alert("Đã có lỗi xảy ra khi thêm người dùng mới.");
        }
    });
}

function displayFormCreate() {
    document.getElementById('userList').style.display = "none";
    document.getElementById('add-user').style.display = "block";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
}

$(document).ready(function() {
    $('#add-customer').on('submit', addNewUser);
    successHandler();
});

function successHandler() {
    $.ajax({
        headers: {
            "Authorization": "Bearer " + token
        },
        method: "GET",
        url: "http://localhost:8080/",
        success: function (data) {
            let content = '<table id="display-list" border="1"><tr>' +
                '<th>Tên User</th>' +
                '<th>Email</th>' +
                '<th>Số điện thoại</th>' +
                '<th>Họ và Tên</th>' +
                '<th>Ngày sinh</th>' +
                '<th>Địa chỉ</th>' +
                '<th>Danh tính</th>' +
                '<th>Trạng thái</th>' +
                '<th>ID</th>' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += getUser(data[i]);
            }
            content += "</table>";
            document.getElementById('userList').innerHTML = content;
            hideForms();
        }
    });
}
