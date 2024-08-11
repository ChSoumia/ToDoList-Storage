const input = document.getElementById("inputTask");
const listTasks = document.getElementById("listTasks");
const message = document.querySelector(".list-tasks");
const dueDateInput = document.getElementById("dueDate");

let tasks = [];

eventListener();
//Get Tasks From Storage
function eventListener() {
  // Execute a function when the user presses "Enter" key on the keyboard
  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      document.querySelector(".input-btn button").click();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    createHTML();
  });
  listTasks.addEventListener("click", removeTask);
}

// Function to add a new task
function addTasks() {
  const task = input.value;
  const dueDate = dueDateInput.value;

  if (task === "") {
    showError("Please enter a task...");
    return;
  }

  const taskObject = {
    task: task,
    id: Date.now(),
    dueDate: dueDate,
  };

  tasks = [...tasks, taskObject];

  createHTML();
}

// Create Task Object
function createHTML() {
  clearHTML();
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = ` 📌 
            ${task.task} | 📅 ${task.dueDate} <span task-id="${task.id}">x</span>
            `;
      listTasks.appendChild(li);
    });
  }
  syncStorages();
}

//Synchronization storage
function syncStorages() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Show ERROR -for validation
function showError(error) {
  const messageError = document.createElement("p");
  messageError.textContent = error;
  messageError.classList.add("error");
  message.appendChild(messageError);
  setTimeout(() => {
    messageError.remove();
  }, 2000);
}

//Remove Task
function removeTask(e) {
  if (e.target.tagName == "SPAN") {
    const taskId = parseInt(e.target.getAttribute("task-id"));
    tasks = tasks.filter((task) => task.id !== taskId);
    createHTML();
    syncStorages();
    e.target.parentElement.remove();
    showError("Task removed successfully...");
    return;
  }
  console.log(e.target);
}

//Clear All Tasks
function deleteAll() {
  tasks = [];
  createHTML();
  syncStorages();
  showError("All tasks removed successfully...");
  return;
}

//Clear HTML
function clearHTML() {
  listTasks.innerHTML = "";
  input.value = "";
  dueDateInput.value = "";
}
