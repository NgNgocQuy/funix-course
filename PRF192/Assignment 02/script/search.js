"use strict";
//  onload
function loadTable() {
  renderTableData(loadLocalStorage());
  renderInputBreed(loadLocalBreed());
}

function renderInputBreed(list) {
  let breedSelectElement = `<option value="">Select Breed</option> `;

  let newList = [list[0]];
  list.forEach((element) => {
    // lược bỏ các breed giống nhau
    if (
      newList.filter((e) => {
        return e.breed == element.breed;
      }).length == 0
    ) {
      newList.push(element);
      breedSelectElement += `<option value="${element.breed}">${element.breed}</option>`;
    }
  });
  breedInput.innerHTML = breedSelectElement;
}
let searchList = [];
const formValueSearch = () => {
  return {
    id: idInput.value,
    petName: nameInput.value,
    //
    type: typeInput.value,
    breed: breedInput.value,
    //
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    //
  };
};

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const sidebar = document.getElementById("sidebar");
const tbody = document.getElementById("tbody");

const findBtn = document.getElementById("find-btn");

// nav toggle
sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// find..
findBtn.addEventListener("click", searchData);

// -----------------------------------------
// search ----------------------------------
function searchData() {
  const dataFormSearch = formValueSearch();
  console.log(dataFormSearch);
  searchList = dataList
    .filter((row) => {
      //   console.log("id", row.id, "key ", dataFormSearch.id);
      return compareIndexOf(row.id, dataFormSearch.id) == true;
    })
    .filter((row) => {
      //   console.log("name", row.id, "key ", dataFormSearch.id);
      return compareIndexOf(row.petName, dataFormSearch.petName) == true;
    })
    .filter((row) => {
      //   console.log("type", row.id, "key ", dataFormSearch.id);
      return compareString(row.type, dataFormSearch.type) == true;
    })
    .filter((row) => {
      //   console.log("breed", row.id, "key ", dataFormSearch.id);
      return compareString(row.breed, dataFormSearch.breed) == true;
    })
    .filter((row) => {
      //   console.log("vaccinated", row.id, "key ", dataFormSearch.id);
      return compareBoolean(row.vaccinated, dataFormSearch.vaccinated) == true;
    })
    .filter((row) => {
      //   console.log("dewormed", row.id, "key ", dataFormSearch.id);
      return compareBoolean(row.dewormed, dataFormSearch.dewormed) == true;
    })
    .filter((row) => {
      //   console.log("sterilized", row.id, "key ", dataFormSearch.id);
      return compareBoolean(row.sterilized, dataFormSearch.sterilized) == true;
    });
  console.log(searchList);
  renderTableData(searchList);
}

function compareIndexOf(row, key) {
  if (key == "") return true;
  return row.toLowerCase().indexOf(key.toLowerCase()) > -1 ? true : false;
  //   true - có tồn tại ký tự
}
function compareString(row, key) {
  if (key == "") return true;
  return row.toLowerCase() == key.toLowerCase() ? true : false;
  //   true - có tồn tại ký tự
}
function compareBoolean(row, key) {
  if (key == true) return row == key ? true : false;
  return true;
  //   true - vì là true >.<
}

// -----------------------------------------
// reload table ----------------------------
function renderTableData(data) {
  if (!data) {
    data = dataList;
  }
  document.getElementById("tbody").innerHTML = "";
  data.forEach((element, index) => {
    addRow(element, index);
  });
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
            <td>
                <i class="bi bi-${choiceCicle(
                  params.vaccinated
                )}-circle-fill"></i>
            </td>`; // Vaccinated
  row.insertCell(9).innerHTML = `
            <td>
                <i class="bi bi-${choiceCicle(
                  params.dewormed
                )}-circle-fill"></i>
            </td>`; // Dewormed
  row.insertCell(10).innerHTML = `
            <td>
                <i class="bi bi-${choiceCicle(
                  params.sterilized
                )}-circle-fill"></i> 
            </td>`; // Sterilized

  row.insertCell(11).innerHTML = `
            <td>${params.date.getDate()}/${
    params.date.getMonth() + 1
  }/${params.date.getFullYear()}</td>`; // Date Added
}
