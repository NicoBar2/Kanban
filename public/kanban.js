document.addEventListener("DOMContentLoaded", () => {
  const columns = document.querySelectorAll(".task-list");
  let dragged;

  function loadTasks() {
    const data = JSON.parse(localStorage.getItem("kanbanData")) || { todo: [], progress: [], done: [] };
    for (const status in data) {
      const column = document.getElementById(status);
      column.innerHTML = "";
      data[status].forEach(taskText => {
        const task = createTask(taskText);
        column.appendChild(task);
      });
    }
  }

  function saveTasks() {
    const data = {
      todo: Array.from(document.getElementById("todo").children).map(task => task.textContent),
      progress: Array.from(document.getElementById("progress").children).map(task => task.textContent),
      done: Array.from(document.getElementById("done").children).map(task => task.textContent),
    };
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }

  function createTask(text) {
    const div = document.createElement("div");
    div.className = "task";
    div.textContent = text;
    div.draggable = true;
    div.addEventListener("dragstart", e => dragged = e.target);
    div.addEventListener("dragend", () => saveTasks());
    return div;
  }

  columns.forEach(column => {
    column.addEventListener("dragover", e => e.preventDefault());
    column.addEventListener("drop", e => {
      if (dragged) {
        column.appendChild(dragged);
        saveTasks();
      }
    });
  });

  window.addTask = function (columnId) {
    const taskText = prompt("Nueva tarea:");
    if (taskText) {
      const task = createTask(taskText);
      document.getElementById(columnId).appendChild(task);
      saveTasks();
    }
  }

  loadTasks();
});

// Monitoreo básico de errores y performance
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Error capturado:", { message, source, lineno, colno, error });
};

window.addEventListener("load", () => {
  const loadTime = performance.now();
  console.log("Tiempo de carga:", loadTime.toFixed(2), "ms");
});
