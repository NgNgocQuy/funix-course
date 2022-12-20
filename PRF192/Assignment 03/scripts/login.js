"use strict";

const userName = document.getElementById("input-username");
const password = document.getElementById("input-password");

const btnSubmit = document.getElementById("btn-submit");

// ./pages/storage.js -------------------------------

function loadpage() {
  // lấy USER_ARRAY từ localStorage
  // lưu vào mảng UserList = []
  loadLocalStorage();
  console.log(UserList);
  // kiểm tra user có đang login
  // lấy CURRENT_USER từ localStorage
  loadCurrentUser();
  // console.log(UserList);
  // console.log(currentUser);
  if (checkValueLocalStorage(currentUser)) {
    if (
      filterUser(currentUser[0].username, currentUser[0].password).length == 1
    ) {
      console.log("login Success");
      window.location.href = "../index.html";
    }
  } else console.log("login fail");
}
loadpage();

// -------------------------------------------
// lắng nghe sự kiện submit từ người dùng
// xử lý giữ liệu đầu vào
// tạo model, gọi hàm ,lưu dữ liệu người dùng
btnSubmit.addEventListener("click", () => {
  // validate
  if (checkInput(userName.value, password.value) == true) {
    // add currentUser
    currentUser = filterUser(userName.value, password.value);
    console.log(currentUser);
    if (currentUser.length != 0) {
      // save storage CURRENT_USER
      saveToStorage("CURRENT_USER", currentUser);
      alert("welcome user ", currentUser.firstName, " " + currentUser.lastName);
      window.location.href = "../index.html";
    }
    // move to home
  }
});

// kiểm tra dữ liệu nhập vào từ input
const checkInput = (userName, password) => {
  switch (true) {
    // username
    case userName == "":
      errMessage("input-username-err", "không được bỏ trống");
      return false;

    // password
    case password == "":
      errMessage("input-password-err", "không được bỏ trống");
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
