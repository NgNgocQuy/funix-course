"use strict";

// ---------------------------------------------
let currentTaskList = [];

// ---------------------------------------------
// ---------------------------------------------
// input element
const inputTask = document.getElementById("input-task");
// button
const btnAdd = document.getElementById("btn-add");
// content
const todoList = document.getElementById("todo-list");

// add new task
btnAdd.addEventListener("click", addTasklist);

// eventListener change task
todoList.addEventListener("click", function (e) {
  // check target in row
  if (e.target.className == "close" /** target to close in class */) {
    // delete task with id is true
    deleteTask(e.target.parentNode.id);
  } else if (
    // target row
    currentTaskList.filter((element) => element.id == e.target.id).length != 0 //
  ) {
    // checked for task is true
    taskIsDone(e.target.id);
  }
});

// ---------------------------------------------
// ---------------------------------------------
// function
function deleteTask(params /* id of task */) {
  // alent comfirm
  if (confirm("delete ?")) {
    // remove task if confirm is true
    taskList = taskList.filter((e) => {
      if (e.id == params) {
        // not return e of list
        console.log("task remove : ", e);
      } else return e;
    });
    // save and remove element
    saveToStorage("TASK_ARRAY", taskList);
    document.getElementById(`${params}`).remove();
    console.log("deleted");
  }
}
//
function taskIsDone(params /** id of task */) {
  //
  if (confirm("task is done ?")) {
    taskList = taskList.map((e) => {
      if (e.id == params /** change isDone form "false" to "true" */)
        e.isDone = true;
      return e;
    });
    // save and change element with id of task
    saveToStorage("TASK_ARRAY", taskList);
    document.getElementById(`${params}`).classList.add("checked");
    console.log("changed isDone success");
  }
}

// find task of currentUser in taskList
// load current task to page
function loadCurrentTaskList() {
  todoList.innerHTML = `<i class="m-3 p-3 text-center">  </i>`; //...

  if (checkValueLocalStorage(taskList) == true) {
    // taskList not undefined
    // get all task of currentUser in taskList
    currentTaskList = taskList.filter(
      (e) => e.owner == currentUser[0].username
    );
    // add row to todoList element
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

// add row for tudoList Element
function addRow(element) {
  let row = document.createElement("div");
  let checked = element.isDone == true ? "checked" : "";
  row.innerHTML = `
    <li class="
    ${checked}
    " id="${element.id}">
        ${element.task}
        <span class="close">×</span>
    </li>
  `;
  todoList.appendChild(row);
}

// add new task for currentUser
function addTasklist() {
  // new task and add to list
  if (inputTask.value != "") {
    // new task
    let newCurrentTask = new todoTask(inputTask.value, currentUser[0].username);
    currentTaskList.push(newCurrentTask); // pust to TaskList of CurentUser
    taskList.push(newCurrentTask); // pust to TaskList storage.js
    // save and add row to element
    saveToStorage("TASK_ARRAY", taskList);
    addRow(newCurrentTask);

    console.log(newCurrentTask);
  }
}

// update isdone of tasklist
// ...
function updateTask(params) {
  currentTaskList = currentTaskList.filter((e) => {
    if (e.id == params.id) e.isDone == true;
    return e;
  });
}

//

// ./pages/storage.js
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
