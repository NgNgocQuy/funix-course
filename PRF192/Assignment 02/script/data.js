"use strict";
//  onload
function loadstorage() {
  loadLocalStorage();
  loadLocalBreed();
  console.log("load local: ", dataList, breedList);
}

// nav toggle
sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

const fileUploader = document.getElementById("input-file");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");

importBtn.addEventListener("click", importFile);
exportBtn.addEventListener("click", exportFile);
let data = [];
// ---------------------------------------
function importFile() {
  let input = fileUploader.files;
  console.log(input);
  if (!input) {
    alert(" ? ? ? ");
  } else {
    const file = input[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        if (file.name == "pet.json") {
          pushFileToList_pet(JSON.parse(reader.result));
        }
        if (file.name == "breed.json") {
          pushFileToList_breed(JSON.parse(reader.result));
        }
      },
      false
    );
    reader.readAsText(file);
  }
}
// pet
function pushFileToList_pet(params) {
  console.log("pushFileToList", params);
  if (params.length > 0) {
    params.forEach((element) => {
      if (
        dataList.filter((e) => {
          return e.id == element.id;
        }) == 0 &&
        validateData(element)
      ) {
        // add breed chưa có
        if (breedList == []) {
          breedList.push({ breed: element.breed, type: element.type });
          saveToStorage("localBreed", breedList);
        } else {
          if (
            breedList.filter((e) => {
              return e.breed == element.breed;
            }).length < 1
          ) {
            breedList.push({ breed: element.breed, type: element.type });
            saveToStorage("localBreed", breedList);
          }
        }
        // thêm data vào list
        dataList.push(formatData(element));
        // lưu data storage
        saveToStorage("localStorage", dataList);
      } else console.log("có gì đó sai sai. check console!");
    });
  } else console.log("có gì đó sai sai ở input.");
}

// breed
function pushFileToList_breed(params) {
  console.log("pushFileToList_breed", params);
  if (params.length > 0) {
    params.forEach((element) => {
      if (breedList.length == 0) {
        breedList.push({ breed: element.breed, type: element.type });
      } else {
        // add breed chưa có
        if (
          breedList.filter((e) => {
            return e.breed == element.breed;
          }).length == 0
        ) {
          breedList.push({ breed: element.breed, type: element.type });
          saveToStorage("localBreed", breedList);
        }
      }
    });
  }
}

// validate data-----------
function validateData(params) {
  switch (true) {
    case params.id == "":
      console.log("ID cannot be empty!", params);
      return false;

    case params.age == "":
      console.log("age cannot be empty!", params);
      return false;
    //   break;

    case params.weight < 1 || params.weight > 15:
      console.log("Weight must be between 1 and 15!", params);
      return false;
    //   break;

    case params.lengthValue < 1 || params.lengthValue > 100:
      alert("Length must be between 1 and 100!", params);
      return false;
    //   break;

    case params.type == "":
      alert("Please select Type!", params);
      return false;
    //   break;

    case params.breed == "":
      alert("Please select Breed!", params);
      return false;

    case params.color == "":
      alert("Please select color!", params);
      return false;

    default:
      return true;
    //   break;
  }
}
// format value
function formatData(params) {
  return {
    id: params.id,
    petName: params.petName,
    age: params.age,
    //
    type: params.type,
    weight: params.weight,
    lengthValue: params.lengthValue,
    color: params.color,
    breed: params.breed,
    //
    vaccinated: params.vaccinated,
    dewormed: params.dewormed,
    sterilized: params.sterilized,
    //
    BMI: params.BMI == "" ? "?" : params.BMI,
    date: params.date,
  };
}
// --------------------------
// export file
function exportFile() {
  var blob = new Blob([JSON.stringify(dataList)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "Pet.json");
}
