document.getElementById("location").addEventListener("click", test);

function test() {
  whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
}

function whereAmI(lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((res) => {
      console.log(res);
      //   console.log(res.json());
      //   console.log(res[0]);
      return res.json();
    })
    .then((res) => {
      console.log(`You are in ${res.city}, ${res.country}`);
    })
    .catch((err) => {
      console.log(err);
    });
}
