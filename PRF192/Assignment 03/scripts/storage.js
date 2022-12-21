"use strict";
//  user list
let UserList = [];
//  todo task
let taskList = [];
//  current user
let currentUser;

let settingUser = [];
// ---hàm event -----------------------------------------------
// load userList
// load USER_ARRAY from localStorage
// push to UserList
function loadLocalStorage() {
  let ValueLocalStorage = localStorage.getItem("USER_ARRAY");
  if (checkValueLocalStorage(ValueLocalStorage)) {
    UserList = JSON.parse(ValueLocalStorage);
  } else console.log("Storage.js : No data in LocalStorage");
}

// load CURRENT_USER from localStorage
// push to currentUser
function loadCurrentUser() {
  let ValueCurrentUser = localStorage.getItem("CURRENT_USER");
  console.log(typeof ValueCurrentUser);
  if (checkValueLocalStorage(ValueCurrentUser)) {
    currentUser = JSON.parse(ValueCurrentUser);
  } else console.log("Storage.js : no current user");
}

// load taskList (todo)
// load TASK_ARRAY from localStorage
// push to taskList
function loadTaksList() {
  let ValueLocalStorage = localStorage.getItem("TASK_ARRAY");
  if (checkValueLocalStorage(ValueLocalStorage)) {
    taskList = JSON.parse(ValueLocalStorage);
  } else console.log("Storage.js : empty taskList");
}

// load setting
// load SETTING_USER từ localStorage
// push to settingUser
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

// support --------------------------------------------
// return false if empy arr
function checkValueLocalStorage(params) {
  //
  return params !== "" && params !== null && params !== undefined
    ? true
    : false;
}
// del user localStorage
function deleteUser(keyValue) {
  console.log("delete user : " + keyValue);
  if (confirm("Are you sure?")) {
    UserList = UserList.filter(function (obj) {
      return obj.id !== keyValue;
    });
    saveToStorage("USER_ARRAY", UserList);
  }
}

// del current user localStorage
function deleteCurrentUser() {
  console.log("delete current user : " + currentUser);
  localStorage.removeItem("CURRENT_USER");
}

// return current user in UserList
function filterUser(userName, password) {
  return UserList.filter((e) => {
    return e.username == userName && e.password == password;
  });
}
