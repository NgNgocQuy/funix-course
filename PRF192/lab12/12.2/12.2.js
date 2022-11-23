const dataTest = [
  [5, 2, 4, 1, 15, 8, 3],
  [16, 6, 10, 5, 6, 1, 4],
];

function test() {
  console.log(dataTest);
  console.log(calcAverageHumanAge(dataTest[0]));
  console.log(calcAverageHumanAge(dataTest[1]));
}

const calcAverageHumanAge = (age) => {
  const humanAge = age
    .map((element) => {
      if (element <= 2) {
        return 2 * element;
      } else if (element > 2) {
        return 16 + element * 4;
      }
    })
    .filter((element) => {
      return element >= 18;
    });
  console.log(humanAge);

  return (
    humanAge.reduce((element, index) => element + index, 0) / humanAge.length
  );
};
// chaining

const beo = document.getElementById("eo-2");
console.log(getComputedStyle(beo));
console.log(div.getComputedStyle(beo));
