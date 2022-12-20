"use strict";

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

todoList.addEventListener("click", function (e) {
  if (e.target.className == "close") {
    deleteTask(e.target.parentNode.id);
  } else if (
    currentTaskList.filter((element) => element.id == e.target.id).length != 0
  ) {
    taskIsDone(e.target.id);
  }
});
//
function deleteTask(params) {
  if (confirm("delete ?")) {
    taskList = taskList.filter((e) => {
      if (e.id == params) {
        console.log("delete", e);
      } else return e;
    });
    saveToStorage("TASK_ARRAY", taskList);
    console.log("deleted");
    document.getElementById(`${params}`).remove();
  }
}
//
function taskIsDone(params) {
  taskList = taskList.map((e) => {
    if (e.id == params) e.isDone = true;
    return e;
  });
  saveToStorage("TASK_ARRAY", taskList);
  document.getElementById(`${params}`).classList.add("checked");
  console.log("changed true");
}
//
btnAdd.addEventListener("click", addTasklist);

let currentTaskList = [];
// ./pages/storage.js -------------------------------

function loadpage() {
  // lấy USER_ARRAY từ localStorage
  // lưu vào mảng UserList = []
  loadLocalStorage();
  // kiểm tra user có đang login
  // lấy CURRENT_USER từ localStorage
  loadCurrentUser();
  //   console.log(UserList);
  console.log(currentUser);

  loadTaksList();

  if (currentUser.length == 1) {
    if (
      filterUser(currentUser[0].username, currentUser[0].password).length == 1
    ) {
      console.log("login Success");
      loadCurrentTaskList();
    }
  } else {
    console.log("login fail");
    window.location.href = "../pages/login.html";
  }
}
loadpage();

function loadCurrentTaskList() {
  todoList.innerHTML = `<i class="m-3 p-3 text-center">  </i>`;
  //   check list
  if (checkValueLocalStorage(taskList) == true) {
    currentTaskList = taskList.filter(
      (e) => e.owner == currentUser[0].username
    );
    try {
      //   console.log(taskList);
      //   console.log(currentTaskList);
      currentTaskList.map((e) => addRow(e));
    } catch (error) {
      console.log(error);
    }
  } else
    todoList.innerHTML = `<i class="m-3 p-3 text-center">you need add task </i>`;
}

function addRow(element) {
  let row = document.createElement("div");

  row.innerHTML = `
    <li class="${element.isDone ?? "checked"}" id="${element.id}">
        ${element.task}
        <span class="close">×</span>
    </li>
  `;
  todoList.appendChild(row);
}

// add task a List
function addTasklist() {
  if (inputTask.value != "") {
    let newCurrentTask = new todoTask(inputTask.value, currentUser[0].username);
    console.log(newCurrentTask);
    currentTaskList.push(newCurrentTask);
    taskList.push(newCurrentTask);
    saveToStorage("TASK_ARRAY", taskList);
    addRow(newCurrentTask);
  }
}

function updateTask(params) {
  currentTaskList = currentTaskList.filter((e) => {
    if (e.id == params.id) e.isDone == true;
    return e;
  });
}

//
