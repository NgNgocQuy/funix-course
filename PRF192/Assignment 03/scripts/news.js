"use strict";

// default value for setting news if user add setting not yet
let settingCurrentUser = {
  category: "technology",
  pageSize: "20",
};

let cardList = [];

//---------------------------------------------------
// ./pages/storage.js -------------------------------

function loadpage() {
  // lấy USER_ARRAY từ localStorage
  // lưu vào mảng UserList = []
  loadLocalStorage();
  // kiểm tra user có đang login
  // lấy CURRENT_USER từ localStorage
  loadCurrentUser();

  loadSettingUser();

  try {
    settingUser.filter((e) => {
      if (e.username == currentUser[0].username) {
        settingCurrentUser.category = e.category;
        settingCurrentUser.pageSize = e.pageSize;
        console.log("load setting success: ", settingCurrentUser);
      }
    });
  } catch (error) {
    console.log("load setting defaut: ", settingCurrentUser);
  }

  console.log(UserList);
  console.log(currentUser);

  if (currentUser.length == 1) {
    if (
      filterUser(currentUser[0].username, currentUser[0].password).length == 1
    ) {
      console.log("login Success");
    }
  } else {
    console.log("login fail");
    window.location.href = "../pages/login.html";
  }
}
loadpage();

//---------------------------------------------------
//---------------------------------------------------

// element content
const newsContainer = document.getElementById("news-container");

// navigation page
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");

// search
const btnSearch = document.getElementById("btn-search-submit");
const inputSearch = document.getElementById("input-search");

// search
btnSearch.addEventListener("click", function (e) {
  // fetch data with input value
  if (inputSearch.value != "") {
    loadContent("gb", 1, inputSearch.value); // ("country","page", "query")
  } else {
    alert("hmm.. bạn cần nhập một cái gì đó");
    // cardList.map();
  }
});

// navigation NEXT
btnNext.addEventListener("click", function (e) {
  console.log("next", e);
  loadContent("gb", e.target.value, inputSearch.value); // ("country","page", "query")
});
// navigation PREV
btnPrev.addEventListener("click", function (e) {
  console.log("prev", e);
  loadContent("gb", e.target.value, inputSearch.value); // ("country","page", "query")
});

//---------------------------------------------------
//---------------------------------------------------

// ...
async function wait(second) {
  return await new Promise((rel) => setTimeout(rel, second * 1000));
}
function loading() {
  newsContainer.innerHTML = `
    <div class="d-flex justify-content-center mt-3"> 
        <i class="animate__animated animate__headShake loading">loading...</i>
    </div>
  `;
}

// --------------------------------------------------
// --------------------------------------------------
/*
https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d334ff5aafda4e82b4e42a3a3a8f6e52
*/
// fetch API
const getJSON = async function (url) {
  try {
    const res = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    });
    console.log("res: ", res);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
// validate and call fetch API function
// load ta data to page
async function loadContent(country, page, query) {
  loading(); //... animation loading

  // set default query to "" if query is undefined
  if (query != "") query = `q=${query}&`;

  //call fuction fetch data
  // save to "res" params
  const res = await getJSON(
    // query : search
    // category: "settingCurrentUser.category" - in localStorage - storage.js
    // pageSize: "settingCurrentUser.pageSize" - in localStorage - storage.js
    // page: navigation page
    `https://newsapi.org/v2/top-headlines?${query}country=${country}&category=${settingCurrentUser.category}&pageSize=${settingCurrentUser.pageSize}&page=${page}&apiKey=d334ff5aafda4e82b4e42a3a3a8f6e52`
  );

  // using data response
  try {
    cardList = res.articles.map((e) => e); // save to array
    // show data to page
    if (cardList.length != 0 /** array not empty*/) {
      await wait(1); //...
      newsContainer.innerHTML = ""; //...
      await addNameCategory(settingCurrentUser.category); //... show category of data
      console.log("response json : ", res);

      // add row to news-container
      cardList.map((e) => addCard(e));
      // change status of next - previous element Navigation page
      navigationContent(res.totalResults, settingCurrentUser.pageSize, page); // (res.totalResults , curent Setting, current page)
    } else
      newsContainer.innerHTML = `
            <div class="d-flex justify-content-center mt-3"> 
                <h5 class="animate__animated animate__headShake loading"><i>not found</i></5>
            </div>
        `;
  } catch (error) {
    console.log("something error: ", error);
  }
}

// change show navigation page
function navigationContent(totalResults, pageSize, page) {
  // change status of navigation
  if (page == 1 /** first page */) {
    // disabled "Prev" navigation
    btnPrev.parentNode.classList.add(`disabled`);
    try {
      // try remove disabled of "next"
      btnNext.parentNode.classList.remove(`disabled`);
    } catch (error) {
      /** ... */
    }
  }
  // change if last page is current page
  if (totalResults / pageSize <= page /** maxPage <= currentPage */) {
    // last page is current page
    // disabled Next navigation
    btnNext.parentNode.classList.add(`disabled`);
    try {
      // fix bug of prev navigation
      // remove if page not is first page
      if (page != 1) btnPrev.parentNode.classList.remove(`disabled`);
    } catch (error) {}
  } else {
    // fix
    // remove disabled of navigation "if not true ..."
    try {
      btnPrev.parentNode.classList.remove(`disabled`);
      btnNext.parentNode.classList.remove(`disabled`);
    } catch (error) {}
  }

  // assign value for navigation
  // value is use for  next and prev event
  btnPrev.value = `${Number(page) - 1}`;
  //
  btnNext.value = `${Number(page) + 1}`;
  //
  pageNum.innerHTML = `${page}`;
}

// show name of category
async function addNameCategory(params) {
  let categoryElement = document.createElement("h6");
  categoryElement.classList.add("p-3", "flex-row", "flex-wrap");
  categoryElement.innerHTML = `
         | ${params} >
      `;
  newsContainer.appendChild(categoryElement);
}

// add card to news-container
async function addCard(params) {
  let card = document.createElement("div");
  card.classList.add("card", "flex-row", "flex-wrap");
  card.innerHTML = `
        <div class="card mb-3" style="">
            <div class="row no-gutters">
            <div class="col-md-4">
                <img
                src="${params.urlToImage}"
                class="card-img"
                alt="${params.description}"
                />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">
                    ${params.title}
                </h5>
                <p class="card-text">
                    ${params.content}
                </p>
                <a
                    href="${params.url}"
                    class="btn btn-primary"
                    >View</a
                >
                </div>
            </div>
            </div>
        </div>
    `;
  newsContainer.appendChild(card);
}

loadContent("gb", 1, inputSearch.value); // default load on page loaded
