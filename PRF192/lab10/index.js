const again = document.getElementById("again");
again.addEventListener("click", myRestart);
//
document.querySelector("#check").addEventListener("click", myCheck);

let goas = randoms();
let nowScore = 20;
let hightScore = 0;

function randoms() {
  return Math.floor(Math.random() * 20);
}

function myRestart() {
  nowScore = 20;
  document.getElementById("main").classList.replace("bg-success", "bg-dark");
  document.getElementById("guess").value = "";
  document.getElementById("start").textContent = "start guessing...";
  document.getElementById("score").textContent = "20";
  document.getElementById("goas").textContent = "?";
}

function myCheck() {
  const check = document.querySelector("#guess").value;
  if (check == goas) {
    document.getElementById("main").classList.replace("bg-dark", "bg-success");
    //
    if (document.getElementById("hightScore").textContent != "") {
      //
      if (document.getElementById("hightScore").textContent > hightScore) {
        nowScore = document.getElementById("hightScore").textContent;
        document.getElementById("hightScore").textContent = nowScore;
      }
    } else document.getElementById("hightScore").textContent = nowScore;
    document.getElementById("start").textContent = "congratulations";
    document.getElementById("goas").textContent = goas;
    goas = randoms();
  } else {
    document.getElementById("score").textContent = nowScore--;
    if (check > goas) {
      document.getElementById("start").textContent = "lower";
    } else {
      document.getElementById("start").textContent = "higher";
    }
  }
}
