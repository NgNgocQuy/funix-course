"use strict";
// variable
let dataList = [
  {
    id: "P001",
    petName: "Tom",
    age: 3,
    //
    type: "Cat",
    weight: 5,
    lengthValue: 50,
    color: "#ff0000",
    breed: "Tabby",
    //
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    //
    BMI: "?",
    date: new Date("2022-03-01"),
  },
  {
    id: "P002",
    petName: "Tyke",
    age: 5,
    //
    type: "Dog",
    weight: 3,
    lengthValue: 40,
    color: "green",
    breed: "Mixed Breed",
    //
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    //
    BMI: "?",
    date: new Date("2022-03-02"),
  },
]; // pet list
// Bắt sự kiện Click vào nút "Submit"
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

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const allBtn = document.getElementById("all-btn");
const BMIBtn = document.getElementById("BMI-btn");
// ----------------------------------------------------------------------
// insert
submitBtn.addEventListener("click", insertData);

// show all
allBtn.addEventListener("click", showAllPet);

// show healthy-btn
healthyBtn.addEventListener("click", showHealthyPet);

// show BMI-btn
BMIBtn.addEventListener("click", calcBMI);
// delete
// const
// submitBtn.addEventListener("click", insertData);

// =========================================================================

// -----------------Lấy được dữ liệu từ các Input Form
function insertData() {
  const dataForm = {
    id: idInput.value,
    petName: nameInput.value,
    age: parseInt(ageInput.value),
    //
    type: typeInput.value,
    weight: weightInput.value,
    lengthValue: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    //
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    //
    BMI: "?",
    date: new Date(),
  };
  console.log(dataForm);
  // Validate dữ liệu hợp lệ
  if (validateData(dataForm) === true) {
    addToList(dataForm); // thêm giữ liệu vào object
    addRow(dataForm, dataList.length - 1); // thêm dữ liệu vào bảng
    clearInput(); // xóa input
  }
}
// -----------------Validate dữ liệu hợp lệ
// sử dụng hàm alert() để đưa ra thông báo cho người dùng
function validateData(params) {
  switch (true) {
    case params.id == "":
      alert("ID cannot be empty!");
      return false;

    case checkValue("id", dataList, params.id) == true:
      alert("ID must unique!");
      return false;
    //   break;

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
// tìm giá trị giống nhau trong object
function checkValue(key, objectData, valueData) {
  for (let index = 0; index < objectData.length; index++) {
    if (objectData[index][`${key}`] == valueData) return true;
  }
  return false;
}

//  -----------------Thêm thú cưng vào danh sách
function addToList(params) {
  dataList.push(params);
}
// -----------------Hiển thị danh sách thú cưng
// choice cicle icon
function choiceCicle(params) {
  if (params == true) {
    return "check";
  } else return "x";
}

// thêm 1 hàng vào cuối bảng
function addRow(params, index) {
  // index - vị trí cuối bảng + 1
  let table = document.getElementById("tbody");
  let row = table.insertRow(index);
  row.setAttribute("id", `${params.id}`); // pet id

  row.insertCell(0).innerHTML = `<th scope="row">${params.id}</th>`; // id
  row.insertCell(1).innerHTML = params.petName; // name
  row.insertCell(2).innerHTML = params.age; // age
  row.insertCell(3).innerHTML = params.type; // type
  row.insertCell(4).innerHTML = params.weight; // weight
  row.insertCell(5).innerHTML = params.lengthValue; // length
  row.insertCell(6).innerHTML = params.breed; // breed

  row.insertCell(7).innerHTML = ` 
        <td>
            <i class="bi bi-square-fill" style="color:${params.color}"></i>
        </td>`; // color

  row.insertCell(8).innerHTML = `
        <td>
            <i class="bi bi-${choiceCicle(params.vaccinated)}-circle-fill"></i>
        </td>`; // Vaccinated
  row.insertCell(9).innerHTML = `
        <td>
            <i class="bi bi-${choiceCicle(params.vaccinated)}-circle-fill"></i>
        </td>`; // Dewormed
  row.insertCell(10).innerHTML = `
        <td>
            <i class="bi bi-${choiceCicle(params.sterilized)}-circle-fill"></i> 
        </td>`; // Sterilized

  row.insertCell(11).innerHTML = `
        <td>${params.date.getDate()}/${
    params.date.getMonth() + 1
  }/${params.date.getFullYear()}</td>`; // Date Added

  row.insertCell(12).innerHTML = `
        <td>
            <button type="button" class="btn btn-danger" 
                onclick="deletePet('${params.id}')"
            >Delete</button>
        </td>
  `; // delete
  if (params.BMI) {
    // console.log("bmi : " + params.BMI);
    row.insertCell(11).innerHTML = `${params.BMI}`; //
  } else row.insertCell(11).innerHTML = `?`; //
}
// reload table
function renderTableData() {
  console.log("reloadTable -- ");
  document.getElementById("tbody").innerHTML = "";
  for (let index = 0; index < dataList.length; index++) {
    addRow(dataList[index], index);
  }
  console.log(dataList);
}
// -----------------Xóa các dữ liệu vừa nhập trên Form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  //
  typeInput.value = "notSelected";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "notSelected";
  //
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.value = false;
};
// -----------------Xóa một thú cưng
// sử dụng hàm alert() để đưa ra thông báo cho người dùng
function deletePet(keyValue) {
  console.log("function deletePet : " + keyValue);
  if (confirm("Are you sure?")) {
    dataList = dataList.filter(function (obj) {
      return obj.id !== keyValue;
    });
    renderTableData();
    alert("pet has deleted!");
  }
}

// -----------------Hiển thị các thú cưng khỏe mạnh
// tiêu chí : Tiêm phòng, Tẩy giun và Triệt sản
function showHealthyPet() {
  allBtn.classList.toggle("hidden");
  healthyBtn.classList.toggle("hidden");
  let newdata = dataList.filter(function (obj) {
    return (
      obj.vaccinated === true &&
      obj.dewormed === true &&
      obj.sterilized === true
    );
  });
  document.getElementById("tbody").innerHTML = "";
  for (let index = 0; index < newdata.length; index++) {
    addRow(newdata[index], index);
  }
}

function showAllPet() {
  allBtn.classList.toggle("hidden");
  healthyBtn.classList.toggle("hidden");
  let newdata = dataList;
  document.getElementById("tbody").innerHTML = "";
  for (let index = 0; index < newdata.length; index++) {
    addRow(newdata[index], index);
  }
}

// -----------------(Nâng cao) Tính toán chỉ số BMI
// BMI sẽ được làm tròn đến chữ số thập phân thứ 2
function calcBMI() {
  let index;
  dataList.forEach((element) => {
    if (element.BMI == "?")
      if (element.type == "Dog") {
        element.BMI =
          Math.round(
            100 * ((element.weight * 703) / element.lengthValue ** 2)
          ) / 100;
      } else {
        element.BMI =
          Math.round(
            100 * ((element.weight * 886) / element.lengthValue ** 2)
          ) / 100;
      }
  });
  renderTableData();
}
