"use strict";
//  onload
function loadTable() {
  renderTableData(loadLocalStorage());
  changeBreed(loadLocalBreed());
}

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const sidebar = document.getElementById("sidebar");

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const allBtn = document.getElementById("all-btn");
const BMIBtn = document.getElementById("BMI-btn");

// -----------------------------------------
// nav toggle
sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// select breed follow type
typeInput.addEventListener("change", () => {
  changeBreed(breedList);
});

// search
submitBtn.addEventListener("click", editData);

// click button by id
// edit pet
function editPet(key) {
  changeInput(
    dataList.filter((e) => {
      return e.id == key;
    })[0]
  );
  activeInput();
}

// primary function----------------------------
// edit
function editData() {
  const dataForm = formValue();
  console.log(dataForm);

  // Validate data
  if (validateData(dataForm) === true) {
    editToList(dataForm); // add to object
    saveToStorage("localStorage", dataList); // save to local storage
    renderTableData(dataList); // add to table
    closeInput();
  }
}
function editToList(params) {
  console.log(params);
  dataList = dataList.map((e) => {
    if (e.id == params.id) {
      e.petName = params.petName;
      e.age = parseInt(params.age);
      //
      e.type = params.type;
      e.weight = params.weight;
      e.lengthValue = params.lengthValue;
      e.color = params.color;
      e.breed = params.breed;
      //
      e.vaccinated = params.vaccinated;
      e.dewormed = params.dewormed;
      e.sterilized = params.sterilized;
      //
      e.BMI = "?";
      return e;
    }
    return e;
  });
}

// thay dổi breed khi chọn type
function changeBreed(list) {
  let type = typeInput.value;
  if (type == "") changeOptionInputBreed(list, "");
  else changeOptionInputBreed(filterTypeOfBreed(list, type), "");
}

//   -----------------------------
// validate data-----------
function validateData(params) {
  switch (true) {
    case params.petName == "":
      alert("ID cannot be empty!");
      return false;

    case params.age < 1 || params.age > 15:
      alert("Age must be between 1 and 15!");
      return false;
    //   break;

    case params.weight < 1 || params.weight > 15:
      alert("Weight must be between 1 and 15!");
      return false;
    //   break;

    case params.lengthValue < 1 || params.lengthValue > 100:
      alert("Length must be between 1 and 100!");
      return false;
    //   break;

    case params.type == "notSelected":
      alert("Please select Type!");
      return false;
    //   break;

    case params.breed == "notSelected":
      alert("Please select Breed!");
      return false;

    default:
      return true;
    //   break;
  }
}

// thêm 1 hàng vào cuối bảng
function addRow(params, index) {
  // index = vị trí cuối bảng + 1
  let table = document.getElementById("tbody");
  let row = table.insertRow(index);
  row.setAttribute("id", `${params.id}`); // pet id

  row.insertCell(
    0
  ).innerHTML = `<th scope="row"><strong>${params.id}</strong></th>`; // id
  row.insertCell(1).innerHTML = params.petName; // name
  row.insertCell(2).innerHTML = params.age; // age
  row.insertCell(3).innerHTML = params.type; // type
  row.insertCell(4).innerHTML = `${params.weight} kg`; // weight
  row.insertCell(5).innerHTML = `${params.lengthValue} cm`; // length
  row.insertCell(6).innerHTML = params.breed; // breed

  row.insertCell(7).innerHTML = ` 
            <td>
                <i class="bi bi-square-fill" style="color:${params.color}"></i>
            </td>`; // color

  row.insertCell(8).innerHTML = `
            <td><i class="bi bi-${choiceCicle(
              params.vaccinated
            )}-circle-fill"></i></td>`; // Vaccinated
  row.insertCell(9).innerHTML = `
            <td><i class="bi bi-${choiceCicle(
              params.dewormed
            )}-circle-fill"></i></td>`; // Dewormed
  row.insertCell(10).innerHTML = `
            <td><i class="bi bi-${choiceCicle(
              params.sterilized
            )}-circle-fill"></i></td>`; // Sterilized

  row.insertCell(11).innerHTML = `
            <td>${params.date.getDate()}/${
    params.date.getMonth() + 1
  }/${params.date.getFullYear()}</td>`; // Date Added

  row.insertCell(12).innerHTML = `
            <td>
                <button type="button" class="btn btn-warning" 
                    onclick="editPet('${params.id}')"
                >Edit</button>
            </td>
      `; // edit
}

function changeInput(params) {
  //   console.log(params);
  idInput.value = params.id;
  nameInput.value = params.petName;
  ageInput.value = params.age;
  //
  typeInput.value = params.type;
  weightInput.value = params.weight;
  lengthInput.value = params.lengthValue;
  colorInput.value = params.color;
  //
  vaccinatedInput.checked = params.vaccinated;
  dewormedInput.checked = params.dewormed;
  sterilizedInput.checked = params.sterilized;
  //
  changeOptionInputBreed(
    filterTypeOfBreed(breedList, params.type),
    params.breed
  );
}
// changeOptionInputBreed
function changeOptionInputBreed(params, selected) {
  let newInnerHTML = `<option value="">Select Breed</option>`;
  let select = "";
  params.forEach((e) => {
    if (e.breed == selected) {
      console.log();
      select = "selected";
    } else select = "";
    newInnerHTML += `<option value="${e.breed}" ${select}>${e.breed}</option>`;
  });
  console.log("changed breed ");
  breedInput.innerHTML = newInnerHTML;
}
// activeInput
function activeInput() {
  document.getElementById("container-form").classList.remove("hide");
}
function closeInput() {
  document.getElementById("container-form").classList.add("hide");
}
// ---------------------
// reload table
function renderTableData(data) {
  if (!data) {
    data = dataList;
  }
  document.getElementById("tbody").innerHTML = "";
  data.forEach((element, index) => {
    addRow(element, index);
  });
}

// -------------------

// Thêm thú cưng vào danh sách
function addToList(params) {
  dataList.push(params);
}
// checkValueLocalStorage
function checkValueLocalStorage(params) {
  if (params !== "" && params !== null && params !== undefined) return true;
  return false;
}
// filterTypeOfBreed
function filterTypeOfBreed(list, type) {
  return list.filter((e) => {
    return e.type == type;
  });
}
