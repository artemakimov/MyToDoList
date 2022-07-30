let currentTasks = document.querySelector("#currentTasks");
let completedTasks = document.getElementById("completedTasks");
let documentForm = document.querySelector("form");
let inputTitle = document.getElementById("inputTitle");
let inputText = document.getElementById("inputText");
const radioValue = document.querySelectorAll('input[type="radio"]')
let gridRadios = document.getElementsByName("gridRadios");
let submitButton = document.getElementById("push");
let minToMaxButton = document.getElementById("minToMaxButton");
let maxToMinButton = document.getElementById("maxToMinButton");
let editFlag = false
let globTask;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("complButton")) {
    let taskObject = JSON.parse(localStorage.getItem(e.target.closest("li").id));

    localStorage.setItem(taskObject.id, JSON.stringify(taskObject));

    e.target.closest("li").remove();
    let taskbuffer = createComplTask(taskObject);
    completedTasks.insertAdjacentHTML("beforeend", taskbuffer);
  }

  if(e.target.classList.contains("editButton")){
    editFlag = true
    let task = e.target.closest("li");
    globTask = task;

    $("#exampleModal").modal("show");

    let taskObject = JSON.parse(localStorage.getItem(task.id));

    inputTitle.value = taskObject.title;
    inputText.value = taskObject.text;

    gridRadios.forEach(item => {
        if (item.value == taskObject.radio) {
            item.checked = true;
        }
    });

  }

  if (e.target.classList.contains("delete")) {

    e.target.closest("li").remove();

  }

});

minToMaxButton.addEventListener("click", (event) => {
    let tasksFromCurr = Array.from(currentTasks.querySelectorAll("li"));
    let tasksFromCompl = Array.from(completedTasks.querySelectorAll("li"));
    let todoHTML = "";
    let completeHTML = "";

    tasksFromCurr.sort(function(a, b) {
        return a.dataset.fulltime - b.dataset.fulltime;
    });;
    tasksFromCompl.sort(function(a, b) {
        return a.dataset.fulltime - b.dataset.fulltime;
    });

    currentTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasksFromCurr.forEach(item => {
        let taskObject = JSON.parse(localStorage.getItem(item.id));
        todoHTML += createTask(taskObject);
    });

    tasksFromCompl.forEach(item => {
        let taskObject = JSON.parse(localStorage.getItem(item.id));;
        completeHTML += createTask(taskObject);
    });

    currentTasks.insertAdjacentHTML("beforeend", todoHTML);
    completedTasks.insertAdjacentHTML("beforeend", completeHTML);
});

maxToMinButton.addEventListener("click", (event) => {
    let tasksFromCurr = Array.from(currentTasks.querySelectorAll("li"));
    let tasksFromCompl = Array.from(completedTasks.querySelectorAll("li"));

    let todoHTML = "";
    let completeHTML = "";

    tasksFromCurr.sort(function(a, b) {
        return b.dataset.fulltime - a.dataset.fulltime;
    });
    tasksFromCompl.sort(function(a, b) {
        return b.dataset.fulltime - a.dataset.fulltime;
    });

    currentTasks.innerHTML = "";
    completedTasks.innerHTML = "";


    tasksFromCurr.forEach(item => {
        let taskObject = JSON.parse(localStorage.getItem(item.id));
        todoHTML += createTask(taskObject);
    });

    tasksFromCompl.forEach(item => {
        let taskObject = JSON.parse(localStorage.getItem(item.id));;
        completeHTML += createTask(taskObject);
    });

    
    currentTasks.insertAdjacentHTML("beforeend", todoHTML);
    completedTasks.insertAdjacentHTML("beforeend", completeHTML);
});


documentForm.addEventListener("submit", (ev) => {
  if (editFlag == false) {
    addTask(ev);
  }else{
    editioningTask(ev);
  }
});

function addTask(ev) {
  ev.preventDefault();

  let title = inputTitle.value;
  let text = inputText.value;
  let today = new Date();
  let date = today.toLocaleTimeString().slice(0, -3) +" "+ today.toLocaleDateString();
  let bigTime = today.getTime();
  let taskId = generateId();
  let radio;
  for (let i = 0; i < gridRadios.length; i++) {
    if (gridRadios[i].checked) {
      radio = gridRadios[i].value;
    }
  }
  let taskObject = {
    bigTime: bigTime,
    title: title,
    text: text,
    date: date,
    taskId: taskId,
    radio: radio,
  };

  localStorage.setItem(taskId, JSON.stringify(taskObject));

  let taskbuffer = createTask(taskObject);
  currentTasks.insertAdjacentHTML("beforeend", taskbuffer);

  documentForm.reset();
  $("#exampleModal").modal("hide");
}

function createTask(taskObjects) {
  let titleBuffer = taskObjects.title;
  let textBuffer = taskObjects.text;
  let dateBuffer = taskObjects.date;
  let taskIdBuffer = taskObjects.taskId;
  let radioBuffer = taskObjects.radio;
  let bigTimeBuffer = taskObjects.bigTime
  let taskHTML = `<li class="list-group-item d-flex w-100 mb-2" data-fullTime="${bigTimeBuffer}" id="${taskIdBuffer}">
    <div class="w-100 mr-2">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${titleBuffer}</h5>
            <div>
                <small class="mr-2">${radioBuffer} priority</small>
                <small class="time">${dateBuffer}</small>
            </div>
        </div>
        <p class="mb-1 w-100 todoText">${textBuffer}</p>
    </div>
    <div class="dropdown m-2 dropleft">
        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
            <button type="button" class="btn btn-success w-100 complButton">Complete</button>
            <button type="button" class="btn btn-info w-100 my-2 editButton">Edit</button>
            <button type="button" class="btn btn-danger w-100 delete">Delete</button>
        </div>
    </div>
</li>`;

  return taskHTML;
}

function createComplTask(taskObjects){
    let titleBuffer = taskObjects.title;
    let textBuffer = taskObjects.text;
    let dateBuffer = taskObjects.date;
    let taskIdBuffer = taskObjects.taskId;
    let radioBuffer = taskObjects.radio;
    let bigTimeBuffer = taskObjects.bigTime
    let taskHTML = `<li class="list-group-item d-flex w-100 mb-2" data-fullTime="${bigTimeBuffer}" id="${taskIdBuffer}">
    <div class="w-100 mr-2">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${titleBuffer}</h5>
            <div>
                <small class="mr-2">${radioBuffer} priority</small>
                <small class="time">${dateBuffer}</small>
            </div>
        </div>
        <p class="mb-1 w-100 todoText">${textBuffer}</p>
    </div>
    <div class="dropdown m-2 dropleft">
        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
            <button type="button" class="btn btn-danger w-100 delete">Delete</button>
        </div>
    </div>
</li>`;

  return taskHTML;
}

function editioningTask(ev){
    ev.preventDefault();

    let task = globTask;

    let titleOriginal = task.querySelector("h5");
    titleOriginal.textContent = inputTitle.value;

    let textOriginal = task.querySelector("p");
    textOriginal.textContent = inputText.value;

    let radioOriginal = task.querySelector("small")
    let radio;

    radioValue.forEach(item => {
        if (item.checked) {
            radio = item.value;
            radioOriginal.textContent = item.value + " priority";
        }
    })

    let today = new Date();
    let date = today.toLocaleTimeString().slice(0, -3) +" "+ today.toLocaleDateString();


    const bigTime = today.getTime();
    task.bigTime = bigTime;

    let dateElement = task.querySelector(".time");
    dateElement.textContent = date;

    taskObject = {
        bigTime: bigTime,
        time: date,
        title: titleOriginal.textContent,
        text: textOriginal.textContent,
        date: date,
        taskId: task.id,
        radio: radio,
    }

    localStorage.setItem(task.id, JSON.stringify(taskObject));

    documentForm.reset();
    $("#exampleModal").modal("hide");
    editFlag = false;
}



let colorArray = [
  "#582b7a",
  "#08d2fb",
  "#7c49ff",
  "#6afffe",
  "#87a96b",
  "#06c397",
  "linear-gradient(90deg, rgba(0,212,255,1) 35%, rgba(2,0,36,0.45451684091605393) 90%)",
  "white",
];

let i = 0;
function changeColor() {
  document.body.style.background = colorArray[i];
  i++;
  if (i > colorArray.length - 1) {
    i = 0;
  }
}

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
