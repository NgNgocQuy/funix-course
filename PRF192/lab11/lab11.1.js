const poll = {
  question: "What is your favourite programming language? ",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  numberOfVotes: new Array(4).fill(0),
};

const answerBtn = document.getElementById("answer");

answerBtn.addEventListener("click", registerNewAnswer);
// prompt()

function registerNewAnswer() {
  const answer = prompt(
    `${poll.question} \n ${arrString(poll.options)} \n (Write option number)`
  );
  if (checkNumber(answer)) {
    poll.numberOfVotes[answer] += 1;
    displayResults(poll.numberOfVotes);
    displayResults(`${poll.numberOfVotes}`);
  }
}

function displayResults(type) {
  if (typeof type == "string") {
    console.log(`Poll results are ${type}`);
    document.getElementById(
      "resultString"
    ).innerHTML = `Poll results are ${type}`;
  } else if (typeof type == "object") {
    console.log(type);
    document.getElementById("resultObject").innerHTML = type;
  } else console.log("something wrong ?!");
}

function checkNumber(params) {
  if (!isNaN(params)) {
    console.log(params);
    if (params <= 3 && params >= 0) {
      return true;
    }
  }
  alert("Câu trả lời không hợp lệ");

  return false;
}
function arrString(data) {
  let newData = "";
  data.forEach((element) => {
    newData += `${element} \n `;
  });
  return newData;
}
