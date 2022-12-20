"use strict";

const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const userName = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");

const btnSubmit = document.getElementById("btn-submit");

// ./pages/storage.js -------------------------------
function loadpage() {
  // lấy USER_ARRAY từ localStorage
  // lưu vào mảng UserList = []
  loadLocalStorage();

  // kiểm tra user có đang login
  // lấy CURRENT_USER từ localStorage
  //   if (loadCurrentUser() != "") {
  //     loginSuccess();
  //   }
  console.log(UserList);
}

loadpage();

function loginSuccess() {
  console.log("login Success");
}
// lắng nghe sự kiện submit từ người dùng
// xử lý giữ liệu đầu vào
// tạo model, gọi hàm ,lưu dữ liệu người dùng
btnSubmit.addEventListener("click", () => {
  // validate
  if (
    checkInput(
      firstName.value,
      lastName.value,
      userName.value,
      password.value
    ) == true
  ) {
    // create
    let newUser = new User(
      firstName.value,
      lastName.value,
      userName.value,
      password.value
    );
    // add to UserList[]
    UserList.push(newUser);
    // save storage
    saveToStorage("USER_ARRAY", UserList);
    // move to home
    alert("tạo tài khoản thành công. ");
    window.location.href = "../pages/login.html";
  }
});
// kiểm tra dữ liệu nhập vào từ input
const checkInput = (firstName, lastName, userName, password) => {
  switch (true) {
    // name
    case firstName == "":
      errMessage("input-firstname-err", "không được bỏ trống");
      return false;
    case lastName == "":
      errMessage("input-lastname-err", "không được bỏ trống");
      return false;
    // username
    case userName == "":
      errMessage("input-username-err", "không được bỏ trống");
      return false;
    case userName == "":
      errMessage("input-username-err", "đã tồn tại");
      return false;
    // password
    case password.length < 6:
      errMessage("input-password-err", "mật khẩu phải từ 6 ký tự");
      return false;
    case password == userName:
      errMessage(
        "input-password-err",
        "mật khẩu không được trùng với tài khoản"
      );
    case password != confirmPassword.value:
      errMessage("input-password-confirm-err", "mật khẩu chưa đúng");
      return false;

    default:
      return true;
  }
};

// trả về lỗi dưới phần tử input theo id
function errMessage(idElement, text) {
  let errInput = document.getElementById(`${idElement}`);
  errInput.style.color = "red";
  errInput.innerHTML = text;
}
