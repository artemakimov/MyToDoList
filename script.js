let colorButtons = document.getElementById('colorButtons');

colorButtons.addEventListener('click', (e) => {
  if(e.target.classList.contains("firstColor")){
    let currentColor = "#0b57a3";
    document.body.style.backgroundColor = currentColor;
    localStorage.setItem("backgroundColor", currentColor);
  }
  if(e.target.classList.contains("secondColor")){
    let currentColor = "#5e17b6";
    document.body.style.backgroundColor = currentColor;
    localStorage.setItem("backgroundColor", currentColor);
  }
  if(e.target.classList.contains("thirdColor")){
    let currentColor = "#1fc042";
    document.body.style.backgroundColor = currentColor;
    localStorage.setItem("backgroundColor", currentColor);
  }
  if(e.target.classList.contains("fourthСolor")){
    let currentColor = "#d11b64";
    document.body.style.backgroundColor = currentColor;
    localStorage.setItem("backgroundColor", currentColor);
  }
  if(e.target.classList.contains("fifthСolor")){
    let currentColor = "#163e18";
    document.body.style.backgroundColor = currentColor;
    localStorage.setItem("backgroundColor", currentColor);
  }
  if(e.target.classList.contains("sixthСolor")){
    let currentColor = "#bde22c";
    document.body.style.backgroundColor = currentColor;
    localStorage.setItem("backgroundColor", currentColor);
  }
  if(e.target.classList.contains("seventhСolor")){
    let currentColor = "white";
    document.body.style.backgroundColor = currentColor;
    localStorage.setItem("backgroundColor", currentColor);
  }
});

window.onload = function () {
  document.body.style.background = localStorage.getItem("backgroundColor");
  colorButton.style.backgroundColor = localStorage.getItem("backgroundColorButton");
};
let exampleModalLabel = document.getElementById('exampleModalLabel');
let filterButtons = document.getElementById('filterButtons');
let divListContent = document.getElementById("divListContent");
let currentTasks = document.querySelector("#currentTasks");
let completedTasks = document.getElementById("completedTasks");
let documentForm = document.querySelector("form");
let inputTitle = document.getElementById("inputTitle");
let inputText = document.getElementById("inputText");
let radioValue = document.querySelectorAll('input[type="radio"]');
let gridRadios = document.getElementsByName("gridRadios");
let getColor = document.getElementById("getColor");
let submitButton = document.getElementById("push");
let minToMaxButton = document.getElementById("minToMaxButton");
let maxToMinButton = document.getElementById("maxToMinButton");
let editFlag = false;
let globTask;
let taskAmount;
let complTaskAmount;
let color;

document.addEventListener("DOMContentLoaded", showTasks());
document.addEventListener("DOMContentLoaded", tasksAmount());
window.onload = function () {
  document.body.style.background = localStorage.getItem("backgroundColor");
};

documentForm.addEventListener("submit", (ev) => {
  if (editFlag == false) {
    addTask(ev);
  } else {
    editioningTask(ev);
  }
});

divListContent.addEventListener("click", (e) => {
  if (e.target.classList.contains("complButton")) {
    completeTask(e);
  }

  if (e.target.classList.contains("editButton")) {
    editTaskGetInfo(e);
  }

  if (e.target.classList.contains("delete")) {
    deleteTask(e);
  }
});

filterButtons.addEventListener("click", (e) => {
  if(e.target.classList.contains("minToMaxButton")){
    tasksFilter(true);
  }
  if(e.target.classList.contains("maxToMinButton")){
    tasksFilter(false);
  }
});

function tasksFilter(boolVal){
  let tasksFromCurr = Array.from(currentTasks.querySelectorAll("li"));
  let tasksFromCompl = Array.from(completedTasks.querySelectorAll("li"));
  let todoHTML = "";
  let completeHTML = "";

  if(boolVal){
    tasksFromCurr.sort(function (a, b) {
      return a.dataset.fulltime - b.dataset.fulltime;
    });
    tasksFromCompl.sort(function (a, b) {
      return a.dataset.fulltime - b.dataset.fulltime;
    });
  }else{
    tasksFromCurr.sort(function (a, b) {
      return b.dataset.fulltime - a.dataset.fulltime;
    });
    tasksFromCompl.sort(function (a, b) {
      return b.dataset.fulltime - a.dataset.fulltime;
    });
  }

  currentTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  tasksFromCurr.forEach((item) => {
    let taskObject = JSON.parse(localStorage.getItem(item.id));
    todoHTML += createTask(taskObject, true);
  });

  tasksFromCompl.forEach((item) => {
    let taskObject = JSON.parse(localStorage.getItem(item.id));
    completeHTML += createTask(taskObject, false);
  });

  currentTasks.insertAdjacentHTML("beforeend", todoHTML);
  completedTasks.insertAdjacentHTML("beforeend", completeHTML);
}


function addTask(ev) {
  ev.preventDefault();

  let today = new Date();
  let date =
    today.toLocaleTimeString().slice(0, -3) + " " + today.toLocaleDateString();
  let bigTime = today.getTime();

  let radio;
  for (let i = 0; i < gridRadios.length; i++) {
    if (gridRadios[i].checked) {
      radio = gridRadios[i].value;
    }
  }
  let taskId = generateId();
  let taskObject = {
    bigTime: bigTime,
    title: inputTitle.value,
    text: inputText.value,
    date: date,
    taskId: taskId,
    radio: radio,
    color: getColor.value,
    compl: false,
  };

  taskAmount += 1;
  currentTasks.previousElementSibling.innerHTML = `ToDo (${taskAmount})`;

  localStorage.setItem(taskId, JSON.stringify(taskObject));

  let taskbuffer = createTask(taskObject, true);
  currentTasks.insertAdjacentHTML("beforeend", taskbuffer);

  documentForm.reset();
  $("#exampleModal").modal("hide");
}

function createTask(taskObjects, boolValue) {
  let { bigTime, title, text, date, taskId, radio, color } = taskObjects;
  let taskHTML
  if(boolValue){
        taskHTML = `<li class="list-group-item d-flex w-100 mb-2" data-fullTime="${bigTime}" id="${taskId}" style='background-color:${color}'>
        <div class="w-100 mr-2">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${title}</h5>
                <div>
                    <small class="mr-2">${radio} priority</small>
                    <small class="time">${date}</small>
                </div>
            </div>
            <p class="mb-1 w-100 todoText">${text}</p>
        </div>
        <div class="dropdown m-2 dropleft">
            <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1" id="dropdown-menu">
                <button type="button" class="btn btn-success w-100 complButton">Complete</button>
                <button type="button" class="btn btn-info w-100 my-2 editButton">Edit</button>
                <button type="button" class="btn btn-danger w-100 delete">Delete</button>
            </div>
        </div>
    </li>`;
  }else{
    taskHTML = `<li class="list-group-item d-flex w-100 mb-2" data-fullTime="${bigTime}" id="${taskId}" style='background-color:${color}'>
    <div class="w-100 mr-2">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${title}</h5>
            <div>
                <small class="mr-2">${radio} priority</small>
                <small class="time">${date}</small>
            </div>
        </div>
        <p class="mb-1 w-100 todoText">${text}</p>
    </div>
    <div class="dropdown m-2 dropleft">
        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1" id="dropdown-menu">
            <button type="button" class="btn btn-danger w-100 delete">Delete</button>
        </div>
    </div>
</li>`;
  }
  

  return taskHTML;
}


function editioningTask(ev) {
  ev.preventDefault();

  let task = globTask;

  let titleOriginal = task.querySelector("h5");
  titleOriginal.textContent = inputTitle.value;

  let textOriginal = task.querySelector("p");
  textOriginal.textContent = inputText.value;

  let radioOriginal = task.querySelector("small");
  let radio;

  radioValue.forEach((item) => {
    if (item.checked) {
      radio = item.value;
      radioOriginal.textContent = item.value + " priority";
    }
  });

  let today = new Date();
  let date =
    today.toLocaleTimeString().slice(0, -3) + " " + today.toLocaleDateString();

  let bigTime = today.getTime();
  task.bigTime = bigTime;

  let dateElement = task.querySelector(".time");
  dateElement.textContent = date;

  color = getColor.value;
  task.style.backgroundColor = color;

  taskObject = {
    bigTime: bigTime,
    time: date,
    title: titleOriginal.textContent,
    text: textOriginal.textContent,
    date: date,
    taskId: task.id,
    radio: radio,
    color: color,
    compl: false,
  };

  localStorage.setItem(task.id, JSON.stringify(taskObject));

  documentForm.reset();
  $("#exampleModal").modal("hide");
  exampleModalLabel.textContent = "Add Task"
  submitButton.textContent = 'Add Task'
  editFlag = false;
}

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function tasksAmount() {
  taskAmount = currentTasks.getElementsByTagName("li").length;
  complTaskAmount = completedTasks.getElementsByTagName("li").length;
  currentTasks.previousElementSibling.innerHTML += ` (${taskAmount})`;
  completedTasks.previousElementSibling.innerHTML +=
  ` (${complTaskAmount})`;
}

function showTasks() {
  let tasks = Object.keys(localStorage);

  let currentTasksHTML = "";
  let completedTasksHTML = "";

  tasks.forEach((idFind) => {
    if (idFind.startsWith("_")) {
      let task = localStorage.getItem(idFind);
      let taskObject = JSON.parse(task);

      if (taskObject.compl) {
        completedTasksHTML += createTask(taskObject, false);
      } else {
        currentTasksHTML += createTask(taskObject, true);
      }
    }
  });

  currentTasks.insertAdjacentHTML("beforeend", currentTasksHTML);
  completedTasks.insertAdjacentHTML("beforeend", completedTasksHTML);

  tasksFilter(true);
}

function deleteTask(ev){
  if (ev.target.closest("#completedTasks")) {
    complTaskAmount -= 1;
    completedTasks.previousElementSibling.innerHTML = `Completed (${complTaskAmount})`;
  } else {
    taskAmount -= 1;
    currentTasks.previousElementSibling.innerHTML = `ToDo (${taskAmount})`;
  }

  ev.target.closest("li").remove();
  localStorage.removeItem(ev.target.closest("li").id);
}

function editTaskGetInfo(ev){
  editFlag = true;
    let task = ev.target.closest("li");
    globTask = task;
    exampleModalLabel.textContent = "Edit Task"
    submitButton.textContent = 'Edit Task'

    $("#exampleModal").modal("show");

    let taskObject = JSON.parse(localStorage.getItem(task.id));

    inputTitle.value = taskObject.title;
    inputText.value = taskObject.text;
    getColor.value = taskObject.color;

    gridRadios.forEach((item) => {
      if (item.value == taskObject.radio) {
        item.checked = true;
      }
    });
}

function completeTask(e){
  let taskObject = JSON.parse(
    localStorage.getItem(e.target.closest("li").id)
  );
  taskObject.compl = true;
  taskAmount -= 1;
  complTaskAmount += 1;
  currentTasks.previousElementSibling.innerHTML = `ToDo (${taskAmount})`;
  completedTasks.previousElementSibling.innerHTML = `Completed (${complTaskAmount})`;

  localStorage.setItem(e.target.closest("li").id, JSON.stringify(taskObject));

  e.target.closest("li").remove();
  let taskbuffer = createTask(taskObject, false);
  completedTasks.insertAdjacentHTML("beforeend", taskbuffer);
}