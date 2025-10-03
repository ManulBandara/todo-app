const API_BASE = 'http://localhost:8080/index.php';


const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const modeToggle = document.getElementById('modeToggle');

// ========== Dark Mode Toggle ==========
function applyMode() {
  const dark = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', dark);
  modeToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
}
modeToggle.addEventListener('click', () => {
  const dark = !(localStorage.getItem('darkMode') === 'true');
  localStorage.setItem('darkMode', dark);
  applyMode();
});
applyMode();

// ========== Fetch helpers ==========
async function safeFetchJson(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { error: text }; }
  return { ok: res.ok, data };
}

// ========== Fetch Tasks ==========
async function fetchTasks() {
  taskList.innerHTML = '<p class="loading">Loading tasks...</p>';
  const { ok, data } = await safeFetchJson(`${API_BASE}/tasks`);
  if (!ok || !Array.isArray(data)) {
    taskList.innerHTML = `<p class="error">${data.error || 'Failed to load tasks'}</p>`;
    return;
  }
  renderTasks(data);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="no-tasks">No tasks yet 🎉 Start adding some!</p>';
    return;
  }
  tasks.forEach(t => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
      <div class="task-info">
        <h3>${escapeHtml(t.title)}</h3>
        <p>${escapeHtml(t.description || '')}</p>
      </div>
      <button class="done-btn" data-id="${t.id}">Done</button>
    `;
    taskList.appendChild(card);
  });
  document.querySelectorAll('.done-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      const id = e.target.dataset.id;
      const card = e.target.closest('.task-card');
      card.classList.add('done');
      // Wait for animation to complete before removing and refetching
      setTimeout(async () => {
        await safeFetchJson(`${API_BASE}/tasks/${id}/done`, { method: 'POST' });
        fetchTasks();
      }, 600); // Match animation duration
    });
  });
}

// ========== Add Task ==========
addBtn.addEventListener('click', async () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  if (!title) {
    alert('Title is required');
    return;
  }
  const { ok } = await safeFetchJson(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  if (ok) {
    titleInput.value = '';
    descInput.value = '';
    fetchTasks();
  } else {
    alert('Failed to add task');
  }
});

// ========== Helpers ==========
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;' }[c]));
}

// Initial fetch
fetchTasks();

// Modern Feature: Auto-refresh tasks every 30 seconds (for real-time feel if backend supports)
setInterval(fetchTasks, 30000);

// Modern Feature: Press Enter to add task
titleInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
descInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addBtn.click();
  }
});

// Modern Feature: Task count
function updateTaskCount(count) {
  let header = document.querySelector('.right h2');
  if (!header) {
    header = document.createElement('h2');
    header.textContent = 'Your Tasks';
    document.querySelector('.right').insertBefore(header, taskList);
  }
  header.textContent = `Your Tasks (${count})`;
}

// Update renderTasks to include count
const originalRenderTasks = renderTasks;
renderTasks = tasks => {
  originalRenderTasks(tasks);
  updateTaskCount(tasks.length);
};