const a = document.getElementById("nav").innerHTML;
console.log(a);

document.getElementById("nav").innerHTML = generate(a);
function generate(params) {
  console.log(params);
  let newText = "";
  for (let index = 0; index < 20; index++) {
    newText += params;
  }
  return newText;
}
