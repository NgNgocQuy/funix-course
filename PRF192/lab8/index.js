const showModal = document.querySelectorAll(".show_modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const close_btn = document.querySelector(".close_btn");

// const closeBtn = document.querySelector(".close_btn")

function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}
function show_modal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function keys(e) {
  if (e.key == "Escape" && !document.querySelector(".hidden")) {
    closeModal;
  }
}

for (let index = 0; index < showModal.length; index++) {
  showModal[index].addEventListener("click", show_modal);
}

// close
close_btn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  //   console.log(e);
  //   console.log(document.querySelector(".modal").classList.contains("hidden"));
  if (
    e.key == "Escape" &&
    !document.querySelector(".modal").classList.contains("hidden")
  ) {
    closeModal();
  }
});
