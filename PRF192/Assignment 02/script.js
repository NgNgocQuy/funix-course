"use strict";
//  onload
// load giữ liệu từ local Storage
function loadTable() {
  renderTableData(loadLocalStorage());
  changeBreed(loadLocalBreed());
}

// ---------------

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

// insert
submitBtn.addEventListener("click", insertData);

// show all
allBtn.addEventListener("click", showAllPet);

// show healthy-btn
healthyBtn.addEventListener("click", showHealthyPet);

// show BMI-btn
BMIBtn.addEventListener("click", BMIAnimal);

// delete pet - onclick()
function deletePetId(keyID) {
  deletePet(keyID);
}

// primary function----------------------------
// insert
function insertData() {
  const dataForm = formValue();
  console.log(dataForm);
  // Validate data
  if (validateData(dataForm) === true) {
    addToList(dataForm); // add to object
    saveToStorage("localStorage", dataList); // save to local storage
    addRow(dataForm, dataList.length - 1); // add to table
    clearInput();
  }
}

//Hiển thị các thú cưng khỏe mạnh
function showHealthyPet() {
  allBtn.classList.toggle("hidden");
  healthyBtn.classList.toggle("hidden");
  renderTableData(
    dataList.filter(
      (obj) =>
        obj.vaccinated === true &&
        obj.dewormed === true &&
        obj.sterilized === true
    )
  );
}

// hiển thị toàn bộ thú cưng
function showAllPet() {
  allBtn.classList.toggle("hidden");
  healthyBtn.classList.toggle("hidden");
  renderTableData(dataList);
}

// tính BMI
function BMIAnimal() {
  console.log("calc BMIAnimal", typeof dataList, dataList);
  dataList.forEach((element) => {
    if (element.BMI == "?")
      element.BMI = calcBMI(element.weight, element.lengthValue, element.type);
  });
  saveToStorage("localStorage", dataList);
  renderTableData();
}

// thay dổi breed khi chọn type
function changeBreed(list) {
  let type = typeInput.value;
  if (type == "") changeOptionInputBreed(list);
  else changeOptionInputBreed(filterTypeOfBreed(list, type));
}

//   -----------------------------
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

// validate data-----------
function validateData(params) {
  switch (true) {
    case params.id == "":
      alert("ID cannot be empty!");
      return false;

    case params.petName == "":
      alert("pet name cannot be empty!");
      return false;

    case checkValue("id", dataList, params.id) == true:
      alert("ID must unique!");
      return false;
    //   break;

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

    case params.type == "":
      alert("Please select Type!");
      return false;
    //   break;

    case params.breed == "":
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
          <td><i class="bi bi-square-fill" style="color:${params.color}"></i></td>`; // color

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
  <td>
  ${params.date.getDate()}/${
    params.date.getMonth() + 1
  }/${params.date.getFullYear()}
  </td>`; // Date Added

  row.insertCell(12).innerHTML = `
          <td>
              <button type="button" class="btn btn-danger" 
                  onclick="deletePetId('${params.id}')"
              >Delete</button>
          </td>
    `; // delete

  if (params.BMI) {
    // console.log("bmi : " + params.BMI);
    row.insertCell(11).innerHTML = `${params.BMI}`; //
  } else row.insertCell(11).innerHTML = `?`; //
}

// changeOptionInputBreed
function changeOptionInputBreed(params) {
  let newInnerHTML = `<option value="">Select Breed</option>`;
  params.forEach((e) => {
    newInnerHTML += `<option value="${e.breed}">${e.breed}</option>`;
  });
  console.log("changed breed ");
  breedInput.innerHTML = newInnerHTML;
}

// Thêm thú cưng vào danh sách
function addToList(params) {
  dataList.push(params);
}
//Xóa các dữ liệu vừa nhập trên Form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  //
  typeInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "";
  //
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.value = false;
};
//  calc BMI
function calcBMI(weight, lengths, type) {
  return type == "dog"
    ? Math.round(100 * ((weight * 703) / lengths ** 2)) / 100
    : Math.round(100 * ((weight * 886) / lengths ** 2)) / 100;
}
