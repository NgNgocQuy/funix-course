"use strict";
// danh sach user
let UserList = [];
// danh sach todo task
let taskList = [];
// user hien tai dang login
let currentUser;

let settingUser = [];
// ---hàm event -----------------------------------------------
// load danh sách user
// load USER_ARRAY từ localStorage
// trả về UserList
function loadLocalStorage() {
  let ValueLocalStorage = localStorage.getItem("USER_ARRAY");
  if (checkValueLocalStorage(ValueLocalStorage)) {
    UserList = JSON.parse(ValueLocalStorage);
  } else console.log("Storage.js : No data in LocalStorage");
}

// load user hiện tại
// load CURRENT_USER từ localStorage
// trả về currentUser
function loadCurrentUser() {
  let ValueCurrentUser = localStorage.getItem("CURRENT_USER");
  console.log(typeof ValueCurrentUser);
  if (checkValueLocalStorage(ValueCurrentUser)) {
    currentUser = JSON.parse(ValueCurrentUser);
  } else console.log("Storage.js : no current user");
}

// load taskList (todo) for user hiện tại
// load TASK_ARRAY từ localStorage
// trả về taskList
function loadTaksList() {
  let ValueLocalStorage = localStorage.getItem("TASK_ARRAY");
  if (checkValueLocalStorage(ValueLocalStorage)) {
    taskList = JSON.parse(ValueLocalStorage);
  } else console.log("Storage.js : empty taskList");
}

// load setting cho user hiện tại
// load SETTING_USER từ localStorage
// trả về setting
function loadSettingUser() {
  let ValueLocalStorage = localStorage.getItem("SETTING_USER");
  if (checkValueLocalStorage(ValueLocalStorage)) {
    settingUser = JSON.parse(ValueLocalStorage);
  } else console.log("Storage.js : empty Setting");
}

// ---------------------------
// save to storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log("Storage.js: saved ", key, " ; ", value);
}

// hàm phụ trợ --------------------------------------------
//  - kiểm tra localStorage có dữ liệu tồn tại
// trả về false nếu mảng trống
function checkValueLocalStorage(params) {
  //
  return params !== "" && params !== null && params !== undefined
    ? true
    : false;
}
// xóa trong localStorage
function deleteUser(keyValue) {
  console.log("delete user : " + keyValue);
  if (confirm("Are you sure?")) {
    UserList = UserList.filter(function (obj) {
      return obj.id !== keyValue;
    });
    saveToStorage("USER_ARRAY", UserList);
  }
}

// xóa trong localStorage
function deleteCurrentUser() {
  console.log("delete current user : " + currentUser);
  localStorage.removeItem("CURRENT_USER");
}

// tìm user trong UserList
function filterUser(userName, password) {
  return UserList.filter((e) => {
    return e.username == userName && e.password == password;
  });
}
