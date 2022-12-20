"use strict";

let settingCurrentUser = {
  category: "technology",
  pageSize: "20",
};
const newsContainer = document.getElementById("news-container");

const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnSearch = document.getElementById("btn-search-submit");

const inputSearch = document.getElementById("input-search");

btnSearch.addEventListener("click", function (e) {
  if (inputSearch.value != "") {
    loadContent("gb", 1, inputSearch.value);
  } else {
    alert("hmm.. bạn cần nhập một cái gì đó");
  }
});

btnNext.addEventListener("click", function (e) {
  console.log("next", e);
  loadContent("gb", e.target.value, inputSearch.value);
});
btnPrev.addEventListener("click", function (e) {
  console.log("prev", e);
  loadContent("gb", e.target.value, inputSearch.value);
});
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
/*
https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d334ff5aafda4e82b4e42a3a3a8f6e52
*/

let cartList = [];

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

async function loadContent(country, page, query) {
  loading(); // animation loading
  if (query != "") query = `q=${query}&`;

  const res = await getJSON(
    `https://newsapi.org/v2/top-headlines?${query}country=${country}&category=${settingCurrentUser.category}&pageSize=${settingCurrentUser.pageSize}&page=${page}&apiKey=d334ff5aafda4e82b4e42a3a3a8f6e52`
  );
  try {
    cartList = res.articles.map((e) => e);
    if (cartList.length != 0) {
      await wait(1);
      newsContainer.innerHTML = "";
      await addNameCategory(settingCurrentUser.category);
      console.log("response json : ", res);
      // thêm một trường vào news-container
      cartList.map((e) => addCart(e));
      // điều khiển trạng thái cho next - previous
      navigationContent(res.totalResults, settingCurrentUser.pageSize, page);
      /*
       */
    } else
      newsContainer.innerHTML = `
            <div class="d-flex justify-content-center mt-3"> 
                <h5 class="animate__animated animate__headShake loading"><i>not found</i></5>
            </div>
        `;
  } catch (error) {
    console.log("something error");
  }
}
//
function navigationContent(totalResults, pageSize, page) {
  if (page == 1) {
    // disabled Prev navigation
    btnPrev.parentNode.classList.add(`disabled`);
    try {
      btnNext.parentNode.classList.remove(`disabled`);
    } catch (error) {}
  }
  if (totalResults / pageSize <= page) {
    // kiểm tra số trang tối đa có trùng số trang hiện tại
    // disabled Next navigation
    btnNext.parentNode.classList.add(`disabled`);
    try {
      if (page != 1) btnPrev.parentNode.classList.remove(`disabled`);
    } catch (error) {}
  } else {
    // xóa trạng thái disabled cho navigation
    try {
      btnPrev.parentNode.classList.remove(`disabled`);
      btnNext.parentNode.classList.remove(`disabled`);
    } catch (error) {}
  }
  // gán value cho navigation
  //   value này sẽ được sử dụng làm đối số cho event next , prev
  btnPrev.value = `${Number(page) - 1}`;
  //
  btnNext.value = `${Number(page) + 1}`;
  //
  pageNum.innerHTML = `${page}`;
}

// hiển thị tên category
async function addNameCategory(params) {
  let categoryElement = document.createElement("h6");
  categoryElement.classList.add("p-3", "flex-row", "flex-wrap");
  categoryElement.innerHTML = `
         | ${params} >
      `;
  newsContainer.appendChild(categoryElement);
}
// thêm một card cho news-container
async function addCart(params) {
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

loadContent("gb", 1, inputSearch.value);
