const removeLocalStorage = document.querySelector(".fa-trash-restore-alt");
const btnAddToDo = document.querySelector(".fa-plus-square");
const inputToDo = document.querySelector("#input-to-do");
const toDoList = document.querySelector("#to-do-list");
const selectAll = document.querySelector(".select-all");
// ------------------------------------- Initial -------------------------------------

let toDoContainer = [],
  id = 0;
const inCompleteIcon = "fa-circle";
const completeIcon = "fa-check-circle";
const completeLine = "line-through";
//--------------------------------------- addToDo Function ---------------------------------------

function addToDo(toDo, id, done, trash) {
  if (trash) return;
  const checkComplete = done ? completeIcon : inCompleteIcon;
  const checkLine = done ? completeLine : "";
  const thingsToDo = `
  <li class="things-to-do">
  <i class="fas ${checkComplete}"  id = ${id}></i>
  <p class ="text ${checkLine}">${toDo}</p>
  <i class="far fa-trash-alt" id ="${id}"></i>
  </li>`;
  toDoList.insertAdjacentHTML("beforeend", thingsToDo); // inside element, after node end
  inputToDo.value = "";
}

// --------------------------------------- displayToDo Function ---------------------------------------

function displayToDo(e) {
  let toDo = inputToDo.value;
  if (e.keyCode === 13 || e.target.classList.value === "fas fa-plus-square") {
    if (toDo) {
      addToDo(toDo, id, false, false);
      toDoContainer.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("things-to-do", JSON.stringify(toDoContainer));
      id++;
    }
  }
}

// --------------------------------------- click plus or press Enter ---------------------------------------
btnAddToDo.addEventListener("click", displayToDo);
document.addEventListener("keyup", displayToDo);

// --------------------------------------- when user clicked to icon ---------------------------------------
toDoList.addEventListener("click", function (e) {
  const icon = e.target.classList.value;
  if (icon === "fas fa-circle" || icon === "fas fa-check-circle") {
    complete(e);
  } else if (icon === "far fa-trash-alt") {
    removeToDo(e);
  }
  localStorage.setItem("things-to-do", JSON.stringify(toDoContainer)); // chuyen doi kieu du lieu tu javascript sang json
});

function complete(e) {
  toDoContainer[e.target.id].done = !toDoContainer[e.target.id].done;
  e.target.classList.toggle(completeIcon); // lay ra phan tu dang click vao
  e.target.classList.toggle(inCompleteIcon);
  e.target.parentNode.querySelector(".text").classList.toggle(completeLine); // lay ra "li" cua "i", sau do chon phan tu co class la "text" (p) nam ben trong phan tu li
  // console.log(e.target.id);
}
function removeToDo(e) {
  toDoList.removeChild(e.target.parentNode);
  toDoContainer[e.target.id].trash = true;
}
//---------------------------------------  get data from localStorage ---------------------------------------
let toDoData = localStorage.getItem("things-to-do"); // lay du lieu tu local storage
if (toDoData) {
  toDoContainer = JSON.parse(toDoData); // chuyen doi du lieu tu dang json => javascript
  id = toDoContainer.length;
  loadData(toDoContainer);
} else {
  toDoContainer = [];
  id = 0;
}

// --------------------------------------- Function Load Data---------------------------------------
function loadData(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// --------------------------------------- Function Select All Item ---------------------------------------
let toggleSelectAll = true;
selectAll.addEventListener("click", handleSelectAll);
function handleSelectAll() {
  let arrIcon = toDoList.querySelectorAll("li :first-child");
  let arrPara = toDoList.querySelectorAll("li>p");

  arrIcon.forEach(function (icon) {
    icon.className = toggleSelectAll ? "fas fa-check-circle" : "fas fa-circle";
  });
  arrPara.forEach(function (p) {
    p.className = toggleSelectAll ? "line-through text" : "text";
  });
  toDoContainer.forEach(function (item) {
    item.done = toggleSelectAll ? true : false;
    localStorage.setItem("things-to-do", JSON.stringify(toDoContainer));
  });
  toggleSelectAll = !toggleSelectAll;
}
// --------------------------------------- Function Remove Local Storage ---------------------------------------
removeLocalStorage.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
