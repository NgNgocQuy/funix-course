const imgContainer = document.getElementById("image");

const wait = async (seconds) => {
  return await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

const createImage = async function (imgPath) {
  try {
    const imgurl = await fetch(imgPath);
    const img = document.createElement("img");
    img.classList.add("animation");
    img.src = imgurl.url;
    imgContainer.append(img);
    return img;
  } catch (error) {
    console.log(error);
  }
};

const loadNPause = async function () {
  let img = await createImage("./1.png");
  console.log("img 1 loaded");
  await wait(2);
  img.classList.replace("animation", "animation2");
  await wait(1.5);
  img.style.display = "none";
  let img2 = await createImage("./2.png");
  console.log("img 2 loaded");
  await wait(2);
  //   currentImg.classList.replace("animation", "animation2");
  // await wait(1.5);
};
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};
loadAll(["./1.png", "./2.png", "./3.png"]);

const loadAll2 = async function () {
  let list = ["./1.png", "./2.png", "./3.png"];
  let imgs = list.map((e) => {
    createImage(e);
    wait(2);
  });
};

// let currentImg;

// createImage("./1.png")
//   .then((res) => {
//     console.log(1);
//     currentImg = res;
//     console.log(res);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.classList.replace("animation", "animation2");
//     return wait(1.5);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     console.log("2");
//     return createImage("./2.png");
//   })
//   .then((res) => {
//     currentImg = res;
//     console.log(res);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.classList.replace("animation", "animation2");
//     return wait(1.5);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     console.log("3");
//     return createImage("./3.png");
//   })
//   .then((res) => {
//     console.log("3");
//     currentImg = res;
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
