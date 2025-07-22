document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  // Load saved tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task));

  // Form submission event
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText) {
      addTask(taskText);
      saveTask(taskText);
      todoInput.value = "";
    }
  });

  // Add task to the list
  function addTask(taskText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      li.remove();
      removeTask(taskText);
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }

  // Save task to localStorage
  function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove task from localStorage
  function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }
});