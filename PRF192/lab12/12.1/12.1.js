const dataTest = [
  { julia: [3, 5, 2, 12, 7], kate: [4, 1, 15, 8, 3] },
  { julia: [9, 16, 6, 8, 3], kate: [10, 5, 6, 1, 4] },
];

function test() {
  console.log(dataTest);
  console.log("test 1");
  checkDog(dataTest[0].julia, dataTest[0].kate);
  console.log("test 2");
  checkDog(dataTest[1].julia, dataTest[1].kate);
}

function checkDog(dogJulia, dogKate) {
  let newJulia = dogJulia.slice(1, -2);
  dogLog("julia : ", newJulia);
  dogLog("Kate : ", dogKate);
}
function dogLog(name, params) {
  console.log(name);

  params.forEach((element, index) => {
    if (element < 3) console.log(`Dog number ${index} is still a puppy`);
    else
      console.log(
        `Dog number ${index} is an adult, and is ${element} years old`
      );
  });
}
