const btnAddSticky = document.getElementById("stickyBtn");
const stickyBoard = document.getElementById("sticky-board");

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

function getRandomColor() {
  const colors = [1, 2, 3];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `sticky-color-${randomColor}`;
}
