const imgContainer = document.querySelector("#image");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;
    img.classList.add("animation");
    // console.log(img.src);
    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};
let currentImg;

createImage("./1.png")
  .then((res) => {
    console.log(1);
    currentImg = res;
    console.log(res);
    return wait(2);
  })
  .then(() => {
    currentImg.classList.replace("animation", "animation2");
    return wait(1.5);
  })
  .then(() => {
    currentImg.style.display = "none";
    console.log("2");
    return createImage("./2.png");
  })
  .then((res) => {
    currentImg = res;
    console.log(res);
    return wait(2);
  })
  .then(() => {
    currentImg.classList.replace("animation", "animation2");
    return wait(1.5);
  })
  .then(() => {
    currentImg.style.display = "none";
    console.log("3");
    return createImage("./3.png");
  })
  .then((res) => {
    console.log("3");
    currentImg = res;
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
