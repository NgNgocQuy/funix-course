"use strict";
// ./pages/storage.js -------------------------------

function loadpage() {
  // lấy USER_ARRAY từ localStorage
  // lưu vào mảng UserList = []
  loadLocalStorage();
  // kiểm tra user có đang login
  // lấy CURRENT_USER từ localStorage
  loadCurrentUser();
  console.log(UserList);
  console.log(currentUser);
  if (currentUser != undefined) {
    if (
      filterUser(currentUser[0].username, currentUser[0].password).length == 1
    ) {
      console.log("login Success");
      document.getElementById(
        "login-modal"
      ).innerHTML = `Welcome ${currentUser[0].firstName} ${currentUser[0].lastName}`;
    }
  } else {
    console.log("login fail");
    document.getElementById("btn-logout").remove();
  }
}
loadpage();

document.getElementById("btn-logout").addEventListener("click", function (e) {
  deleteCurrentUser();
  window.location.href = "./pages/login.html";
});
