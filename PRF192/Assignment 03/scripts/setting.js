"use strict";

function loadpage() {
  // load USER_ARRAY from localStorage
  // save to array: UserList = []
  loadLocalStorage();

  // load CURENT_USER from localStorage
  // save to array: CurentUser = []
  loadCurrentUser();

  // get SETTING_USER in localStorage
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

// button setting save
const btnSubmit = document.getElementById("btn-submit");
//input
const inputCategory = document.getElementById("input-category");
const inputPageSize = document.getElementById("input-page-size");

// event submit
btnSubmit.addEventListener("click", updateSettingUser);

// add new or change setting of user
function updateSettingUser() {
  let pageSize = inputPageSize.value;
  let category = inputCategory.value;

  // save setting of user
  if (checkInputSetting(pageSize, category)) {
    // new a setting user
    let newSettingCurrentUser = new SettingUser(
      currentUser[0].username,
      pageSize,
      category
    );
    console.log(newSettingCurrentUser.username);

    // add or change value
    if (
      settingUser.filter((e) => {
        if (e.username == newSettingCurrentUser.username) return e;
      }).length == 1
      /** new setting has in settingUser array */
    ) {
      console.log("setting update: ", newSettingCurrentUser);

      // update value in settingUser array
      settingUser = settingUser.map((e) => {
        if (e.username == newSettingCurrentUser.username) {
          e.category = newSettingCurrentUser.category;
          e.pageSize = newSettingCurrentUser.pageSize;
        }
        return e;
      });
      console.log(settingUser);
    } else {
      // add object to array
      settingUser.push(newSettingCurrentUser);
      console.log(settingUser);
      alert("setting updated");
    }

    // save
    saveToStorage("SETTING_USER", settingUser);
  }
}
// validate input
function checkInputSetting(pageSize, category) {
  switch (true) {
    case pageSize == "":
      alert("h??y nh???p page size");
      return false;

    case category == "":
      alert("h??y ch???n category");
      return false;

    default:
      return true;
  }
}
