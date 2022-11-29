"use strict";

//  onload
function loadTable() {
  renderTableData(loadLocalBreed());
}

// ---------------

// ---------------
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");

const sidebar = document.getElementById("sidebar");
const tbody = document.getElementById("tbody");

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const allBtn = document.getElementById("all-btn");
const BMIBtn = document.getElementById("BMI-btn");

// -----------------------------------------

// nav toggle
sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// insert
submitBtn.addEventListener("click", insertData);

// primary function----------------------------
// insert
function insertData() {
  const dataForm = dataBreed();
  console.log(dataForm);

  // Validate data
  if (validateData(dataForm) === true) {
    addToList(dataForm); // add to object
    saveToStorage("localBreed", breedList); // save to local storage
    // addRow(dataForm, breedList.length - 1); // add to table
    renderTableData(breedList); // reload table
    clearInput();
  }
}

// save to storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(key, " : ", value);
}

// delete
function deleteBreedName(keyValue) {
  console.log("function deletePet : " + keyValue);
  if (confirm("Are you sure?")) {
    breedList = breedList.filter(function (obj) {
      return obj.breed !== keyValue;
    });
    saveToStorage("localBreed", breedList);
    renderTableData();
  }
}
// Thêm thú cưng vào danh sách
function addToList(params) {
  breedList.push(params);
}
// save to storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(key, " ; ", value);
}

// ------------------------------------------------
// validateData
function validateData(params) {
  switch (true) {
    case params.breed == "":
      alert("breed = ' '");
      return false;

    case filterCheckBreed(breedList, params.breed, params.type) == false:
      alert("breed = breed");
      return false;

    case params.type == "":
      alert("type = ' '");
      return false;

    default:
      console.log("validate = true ");
      return true;
  }
}
// ------------------------------------------------

// thêm 1 hàng vào cuối bảng
function addRow(params, index) {
  // index = vị trí cuối bảng + 1
  let table = document.getElementById("tbody");
  let row = table.insertRow(index);
  row.setAttribute("id", `${params.breed}`); // pet id
  row.insertCell(0).innerHTML = `<th scope="row">${index + 1}</th>`; // id
  row.insertCell(1).innerHTML = params.breed; // age
  row.insertCell(2).innerHTML = params.type; // type
  row.insertCell(3).innerHTML = `
            <td>
                <button type="button" class="btn btn-danger" 
                    onclick="deleteBreedName('${params.breed}')"
                >Delete</button>
            </td>
      `; // delete
}

// reload table
function renderTableData(data) {
  if (!data) {
    data = breedList;
  }
  document.getElementById("tbody").innerHTML = "";
  data.forEach((element, index) => {
    addRow(element, index);
  });
  console.log("reloadTable", data);
}
// --------------------------------------------
function clearInput() {
  typeInput.value = "";
  breedInput.value = "";
}
