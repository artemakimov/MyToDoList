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

document.querySelector("#push").onclick = function () {
  let title = document.getElementById("inputTitle");
  let text = document.getElementById("inputText");
  let rad = document.getElementsByName("gridRadios");
  let radio;
  let editText = document.getElementById("inputText");
  let today = new Date();
  let hours = today.toLocaleTimeString().slice(0,-3);
  let year = today.toLocaleDateString();
  let date = `${hours} ${year}`;
  for (let i = 0; i < rad.length; i++) {
    if (rad[i].checked) {
      radio = rad[i];
    }
  }
  document.querySelector("#currentTasks").innerHTML += `
            <li class="list-group-item d-flex w-100 mb-2">
            <div class="w-100 mr-2">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${title.value}</h5>
                    <div>
                        <small class="mr-2">${radio.value} priority</small>
                        <small>${date}</small>
                    </div>

                </div>
                <p class="mb-1 w-100 todoText">${text.value}</p>
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
        </li>
        `;
    $("#exampleModal").modal("hide");
    
  let current_task = document.querySelectorAll(".editButton");
  for (let i = 0; i < current_task.length; i++) {
    current_task[i].onclick = function () {
      $("#exampleModal").modal("show");
      document.getElementById("inputText").value = this.closest(".todoText").value;
      $("#exampleModal").modal("hide");
    };
  }

  let current_tasks = document.querySelectorAll(".delete");
  for (let i = 0; i < current_tasks.length; i++) {
    current_tasks[i].onclick = function () {
      this.closest(".list-group-item").remove();
    };
  }

  let current_tasks1 = document.querySelectorAll(".complButton");
  for (let i = 0; i < current_tasks1.length; i++) {
    current_tasks1[i].onclick = function () {
    document.querySelector("#completeTasks").innerHTML += this.closest(".list-group-item").value;
      this.closest(".list-group-item").remove();
    };
  }
};
