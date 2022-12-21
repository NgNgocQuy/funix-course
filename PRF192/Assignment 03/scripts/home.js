"use strict";
// ./pages/storage.js -------------------------------

function loadpage() {
  // load USER_ARRAY from localStorage
  // save to array: UserList = []
  loadLocalStorage();

  // load CURENT_USER from localStorage
  // save to array: CurentUser = []
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

// delete current user
document.getElementById("btn-logout").addEventListener("click", function (e) {
  deleteCurrentUser();
  window.location.href = "./index.html";
});
