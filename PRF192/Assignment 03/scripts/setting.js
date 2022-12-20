"use strict";

const btnSubmit = document.getElementById("btn-submit");
const inputCategory = document.getElementById("input-category");
const inputPageSize = document.getElementById("input-page-size");

btnSubmit.addEventListener("click", updateSettingUser);

function loadpage() {
  // lấy USER_ARRAY từ localStorage
  // lưu vào mảng UserList = []
  loadLocalStorage();
  // kiểm tra user có đang login
  // lấy CURRENT_USER từ localStorage
  loadCurrentUser();

  // lấy all setting hiện tại
  // lấy SETTING_USER từ localStorage
  loadCurrentUser();

  loadSettingUser();

  console.log(UserList);
  console.log(currentUser);
  if (currentUser.length == 1) {
    if (
      filterUser(currentUser[0].username, currentUser[0].password).length == 1
    ) {
      console.log("login Success");
    }
  } else console.log("login fail");
}
loadpage();

//

function updateSettingUser() {
  let pageSize = inputPageSize.value;
  let category = inputCategory.value;
  if (checkInputSetting(pageSize, category)) {
    let newSettingCurrentUser = new SettingUser(
      currentUser[0].username,
      pageSize,
      category
    );
    console.log(newSettingCurrentUser.username);
    if (
      settingUser.filter((e) => {
        if (e.username == newSettingCurrentUser.username) return e;
      }).length == 1
    ) {
      console.log("setting update: ", newSettingCurrentUser);
      settingUser = settingUser.map((e) => {
        if (e.username == newSettingCurrentUser.username) {
          e.category = newSettingCurrentUser.category;
          e.pageSize = newSettingCurrentUser.pageSize;
        }
        return e;
      });
      console.log(settingUser);
    } else {
      settingUser.push(newSettingCurrentUser);
      console.log(settingUser);
      alert("setting updated");
    }
    saveToStorage("SETTING_USER", settingUser);
  }
  // settingUser.
}

function checkInputSetting(pageSize, category) {
  switch (true) {
    case pageSize == "":
      alert("hãy nhập page size");
      return false;

    case category == "":
      alert("hãy chọn category");
      return false;

    default:
      return true;
  }
}
