"use strict";
// pet
function loadLocalStorage() {
  let ValueLocalStorage = localStorage.getItem("localStorage");
  if (checkValueLocalStorage(ValueLocalStorage)) {
    dataList = JSON.parse(ValueLocalStorage).map((e) => {
      if (checkValueLocalStorage(e) && checkValueLocalStorage(e.date)) {
        e.date = new Date(e.date); // prase date()
      }
      return e;
    });
  } else console.log("No data in LocalStorage");

  return dataList;
}
// breed
function loadLocalBreed() {
  //
  let ValueLocalBreed = localStorage.getItem("localBreed");
  if (checkValueLocalStorage(ValueLocalBreed))
    breedList = JSON.parse(ValueLocalBreed);
  return breedList;
}

let dataList = [];
let breedList = [];
const formValue = () => {
  return {
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
};
const dataBreed = () => {
  return {
    breed: breedInput.value,
    type: typeInput.value,
  };
};

// save to storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log("Storage.js: ", key, " ; ", value);
}

// delete
function deletePet(keyValue) {
  console.log("function deletePet : " + keyValue);
  if (confirm("Are you sure?")) {
    dataList = dataList.filter(function (obj) {
      return obj.id !== keyValue;
    });
    saveToStorage("localStorage", dataList);
    renderTableData();
  }
}

// -------------------
// tìm giá trị giống nhau trong object
function checkValue(key, objectData, valueData) {
  for (let index = 0; index < objectData.length; index++) {
    if (objectData[index][`${key}`] == valueData) return true;
  }
  return false;
}

// choice cicle icon
function choiceCicle(params) {
  if (params == true) {
    return "check";
  } else return "x";
}

// checkValueLocalStorage - kiểm tra xem localStorage có dữ liệu hay không
function checkValueLocalStorage(params) {
  if (params !== "" && params !== null && params !== undefined) return true;
  return false;
}
// filterTypeOfBreed - return breed thuộc type
function filterTypeOfBreed(list, type) {
  return list.filter((e) => {
    return e.type == type;
  });
}
// filter - kiểm tra breed có trùng với data đã tạo
// trả về true nếu mảng rỗng
function filterCheckBreed(data, breed, type) {
  return (
    data.filter((e) => {
      if (e.type == type) return e.breed == breed;
    }).length == 0
  );
}
