const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");

let tasks = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = input.value.trim();

  if (!value) {
    return;
  }

  const task = {
    id: Date.now(),
    title: value,
    description: "No description",
    priority: "Medium",
    completed: false,
    dueDate: new Date(Date.now() + 86400000),
    tags: ["general"],
  };
  tasks.push(task);
  input.value = "";
  renderTasks();
});
function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const diff = dueDate - now;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const timeText =
      daysLeft < 0
        ? `Overdue by ${Math.abs(daysLeft)} day(s)`
        : `Due in ${daysLeft} day(s)`;

    li.innerHTML = `
    <article data-testid= "test-todo-card" >
    <input type="checkbox"  data-testid="test-todo-complete-toggle" ${task.completed ? "checked" : ""} onchange="toggleComplete(${task.id})" />
    <h3 data-testid="test-todo-title">${task.title}</h3>

        <p data-testid="test-todo-description">
          ${task.description}
        </p>
        <span data-testid="test-todo-priority">
          ${task.priority}
        </span>
<time 
          data-testid="test-todo-due-date"
          datetime="${dueDate.toISOString()}"
        >
          Due ${dueDate.toDateString()}
        </time>
<div data-testid="test-todo-time-remaining">
          ${timeText}
        </div>
         <div data-testid="test-todo-status">
          ${task.completed ? "Completed" : "Pending"}
        </div>
    <ul data-testid="test-todo-tags">
          ${task.tags
            .map((tag) => `<li data-testid="test-todo-tag-${tag}">${tag}</li>`)
            .join("")}
            
        </ul>
         <button 
          data-testid="test-todo-edit-button"
          onclick="editTask(${task.id})"
        >
          Edit
        </button>

        <button 
          data-testid="test-todo-delete-button"
          onclick="deleteTask(${task.id})"
        >
          Delete
        </button>
    </article>`;
    list.appendChild(li);
  });
}
function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );

  renderTasks();
}
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}
function editTask(id) {
  const task = tasks.find((t) => t.id === id);

  const newTitle = prompt("Edit task:", task.title);
  if (!newTitle) return;

  tasks = tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t));

  renderTasks();
}
setInterval(renderTasks, 60000);
