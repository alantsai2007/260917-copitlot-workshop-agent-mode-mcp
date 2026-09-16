const STORAGE_KEY = 'offline-todo-items';
const FILTER_STORAGE_KEY = 'offline-todo-filter';
const FILTER_VALUES = ['all', 'active', 'completed'];

const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const emptyMessage = document.querySelector('#empty-message');
const remainingCount = document.querySelector('#remaining-count');
const themeToggle = document.querySelector('#theme-toggle');
const filterButtons = document.querySelectorAll('.filter-button');
const clearCompletedButton = document.querySelector('#clear-completed');

let todos = loadTodos();
let currentFilter = loadFilter();
const themeStorageKey = 'offline-todo-theme';

// 從瀏覽器儲存空間讀取既有待辦，資料損壞時回到空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

function loadFilter() {
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
  return FILTER_VALUES.includes(savedFilter) ? savedFilter : 'all';
}

// 將目前清單保存到瀏覽器，讓重新整理後仍能保留資料。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? '☀️ 淺色模式' : '🌙 深色模式';
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
}

function getFilteredTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }
  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

function updateEmptyMessage(filteredTodos) {
  if (todos.length === 0) {
    emptyMessage.textContent = '還沒有任何待辦事項,新增一個吧!';
  } else if (filteredTodos.length === 0) {
    const filterName = currentFilter === 'active' ? '未完成' : '已完成';
    emptyMessage.textContent = `目前沒有${filterName}的待辦事項。`;
  }
  emptyMessage.hidden = filteredTodos.length > 0;
}

function renderTodos() {
  todoList.innerHTML = '';
  const filteredTodos = getFilteredTodos();
  updateEmptyMessage(filteredTodos);

  filteredTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = 'todo-item';
    if (todo.completed) {
      item.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.className = 'todo-check';
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `完成待辦事項：${todo.text}`);
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除待辦事項：${todo.text}`);
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  remainingCount.textContent = `未完成:${unfinishedCount} 項`;
  clearCompletedButton.disabled = !hasCompletedTodos;
}

function setFilter(filter) {
  currentFilter = FILTER_VALUES.includes(filter) ? filter : 'all';
  localStorage.setItem(FILTER_STORAGE_KEY, currentFilter);
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive);
  });
  renderTodos();
}

function addTodo(text) {
  todos.push({
    id: Date.now(),
    text,
    completed: false
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

// 確認後一次清除所有已完成的待辦事項。
function clearCompletedTodos() {
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  if (!hasCompletedTodos || !window.confirm('確定要清除所有已完成的待辦事項嗎？')) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  addTodo(text);
  input.value = '';
  input.focus();
});

themeToggle.addEventListener('click', toggleTheme);
clearCompletedButton.addEventListener('click', clearCompletedTodos);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

applyTheme(getPreferredTheme());
renderTodos();