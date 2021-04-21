// Create element

// const li = document.createElement("li");

// // Add class to an element
// li.className = "li-class";

// // Add id to an element
// li.id = "li-id";
// li.innerHTML("Hello World");

// console.log(li);

// const select = document.querySelector("select");

// select.addEventListener("change", runEvent);
// function runEvent(e) {
//   console.log(`Event Type: ${e.type}`);
//   console.log(e.target.value);
// }

// const form = document.querySelector("form");
// const Input = document.getElementById("input");
// const Heading = document.querySelector("h1");
// const heading2 = document.createElement("h2");
// heading2.style.color = "red";

// Key Down event
/*Input.addEventListener("keydown", (e) => {
  console.log("Event Type", e.type);
  console.log(e.target.value);
  Heading.innerHTML = e.target.value;
  heading2.innerHTML = e.target.value;
  console.log(heading2);
});
*/

// Key Up event
/*Input.addEventListener("keyup", (e) => {
  console.log("Event type", e.type);
  console.log(e.target.value);
});
*/

// Keypress
// focus
// blur
// // Cut
// Input.addEventListener("cut", (e) => {
//   console.log("Event Type", e.type);
// });

// Input.value = "";
// form.addEventListener("submit", runEvent);
// function runEvent(e) {
//   console.log(`Event Type: ${e.type}`);
//   console.log(Input.value);
//   e.preventDefault();
// }

// const select = document.querySelector("select");
// select.addEventListener("change", selectcall);

// function selectcall(e) {
//   console.log("event type", e.type);
//   console.log(e.target.value);
// }

// EVENT BUBBLING
// document.getElementById("title").addEventListener("click", () => {
//   console.log("title is clicked");
// });
// const title = document.getElementById("title");
// title.addEventListener("click", () => {
//   console.log("Title is clicked");
// });

// EVENT DELIGATION
// document.body.addEventListener("click", (e) => {
//   if (e.target.className === "delete") {
//     console.log("delete item");
//   }
// });

// const ul = document.getElementById("ul");
// ul.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delete")) {
//     console.log("Item Deleted");
//     e.target.parentElement.remove();
//   }
// });

// LOCAL STORAGE
// localStorage.setItem("Name", "Rahul Baghla");
// localStorage.setItem("Age", "21");

// const name = localStorage.getItem("Name");
// console.log(name);

// TASK TRACKER
// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   const task = document.getElementById("task").value;
//   var tasks;
//   if (localStorage.getItem("tasks") === null) {
//     tasks = [];
//   } else {
//     tasks = JSON.parse(localStorage.getItem("tasks"));
//   }
//   tasks.push(task);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   alert("Task Saved");
//   e.preventDefault();
// });

// const tasks = JSON.parse(localStorage.getItem("tasks"));
// tasks.forEach((task) => {
//   console.log(task);
// });

// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.getElementById("btn");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listners
loadEventListners();

// Load all event listners
function loadEventListners() {
  // Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add Task
  form.addEventListener("submit", addTask);
  // Remove Task
  taskList.addEventListener("click", removeTask);
  // Clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks
function getTasks() {
  var tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa-remove">x</i>';

    //Appent the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // Create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove">x</i>';

  //Appent the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure to remove this task ?")) {
      e.target.parentElement.parentElement.remove();
      // remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    // console.log("this is task ", task);
    // console.log("this is taskItem ", taskItem.textContent.slice(0, -1));
    if (taskItem.textContent.slice(0, -1) === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {
  if (confirm("Are you sure to clear all task ?")) {
    taskList.innerHTML = "";
  }

  localStorage.clear();
  // OR
  // while (taskList.firstChild) {
  //   taskList.removeChild(taskList.firstChild);
  // }
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
