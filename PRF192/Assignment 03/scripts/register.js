"use strict";

// ./pages/storage.js -------------------------------
function loadpage() {
  // load USER_ARRAY from localStorage
  // save to array: UserList = []
  loadLocalStorage();

  // ...
  //
  console.log(UserList);
}

loadpage();

// input
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const userName = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");

// submit btn
const btnSubmit = document.getElementById("btn-submit");
// ...
function loginSuccess() {
  console.log("login Success");
}

// listen to event submit from user
// validate input value
// create user model, update userList
btnSubmit.addEventListener("click", () => {
  // create new user
  if (
    checkInput(
      firstName.value,
      lastName.value,
      userName.value,
      password.value
    ) == true
    /** validate */
  ) {
    // create user
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
    window.location.href = "../index.html";
  }
});
// validate data input
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

// return message to under input element
function errMessage(idElement, text) {
  let errInput = document.getElementById(`${idElement}`);
  errInput.style.color = "red";
  errInput.innerHTML = text;
}
