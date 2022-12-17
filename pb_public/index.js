import PocketBase from "https://unpkg.com/pocketbase@0.8.3/dist/pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");

// check if user is authenticated
if (!pb.authStore.isValid) {
  console.log("not signed in, redirecting to login");
  window.location.replace("http://localhost:3000/login.html");
} else {
  console.log("authenticated: true");
}

const pbListener = pb.authStore.onChange((isValid) => {
  console.log("token validity changed...");
  if (!isValid) {
    window.location.replace("http://localhost:3000/login.html");
  }
});

const btnAddSticky = document.getElementById("stickyBtn");
const stickyBoard = document.getElementById("sticky-board");
const logoutBtn = document.getElementById("logout");

function createStickyElement() {
  //creating Elements for HTML
  const sticky = document.createElement("div");
  const header = document.createElement("input");
  const body = document.createElement("textarea");
  //classes to add to elements
  sticky.classList.add("sticky", getRandomColor());
  header.classList.add("sticky-header");
  body.classList.add("sticky-body");
  //attributes to give to elements
  header.setAttribute("placeholder", "Enter Sticky Note title...");
  body.setAttribute("placeholder", "Enter Sticky note tasks");
  //apend elements to parent
  sticky.append(header, body);
  //return sticky
  return sticky;
}

btnAddSticky.addEventListener("click", () => {
  //call sticky function to create sticky note
  const sticky = createStickyElement();
  //double click to delete sticky with confirmation
  sticky.addEventListener("dblclick", () => {
    const header = sticky.querySelector(".sticky-header").value;
    const deleteSticky = confirm(`Do you wish to delete '${header}'?`);
    if (!deleteSticky) {
      return;
    }
    sticky.remove();
  });
  //Append sticky to sticky board
  stickyBoard.appendChild(sticky);
});

logoutBtn.addEventListener("click", () => {
  pb.authStore.clear();
});

function getRandomColor() {
  const colors = [1, 2, 3];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `sticky-color-${randomColor}`;
}
