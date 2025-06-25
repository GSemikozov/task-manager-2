const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory data
let tasks = [];
let categories = [];
let taskIdCounter = 1;
let categoryIdCounter = 1;

// Helper: paginate
function paginate(array, page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize;
  return {
    data: array.slice(start, start + pageSize),
    total: array.length,
    page,
    pageSize
  };
}

// --- TASKS ---
// GET /tasks?status=&title=&from=&to=&sortBy=&sortDir=&page=&pageSize=
app.get('/tasks', (req, res) => {
  let result = [...tasks];
  const { status, title, from, to, sortBy = 'dueDate', sortDir = 'asc', page = 1, pageSize = 10 } = req.query;

  if (status) result = result.filter(t => t.status === status);
  if (title) result = result.filter(t => t.title.toLowerCase().includes(title.toLowerCase()));
  if (from) result = result.filter(t => new Date(t.dueDate) >= new Date(from));
  if (to) result = result.filter(t => new Date(t.dueDate) <= new Date(to));

  if (sortBy) {
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'dueDate') {
        valA = new Date(valA);
        valB = new Date(valB);
      }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const paged = paginate(result, Number(page), Number(pageSize));
  res.json(paged);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title, description, dueDate, status = 'To Do', categoryId } = req.body;
  const task = {
    id: taskIdCounter++,
    title,
    description,
    dueDate,
    status,
    categoryId: categoryId || null
  };
  tasks.push(task);
  res.status(201).json(task);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json(tasks[idx]);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(idx, 1);
  res.status(204).send();
});

// POST /tasks/:id/assign-category
app.post('/tasks/:id/assign-category', (req, res) => {
  const { categoryId } = req.body;
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (categoryId && !categories.find(c => c.id === categoryId)) {
    return res.status(400).json({ error: 'Category not found' });
  }
  task.categoryId = categoryId || null;
  res.json(task);
});

// --- CATEGORIES ---
// GET /categories?title=&sortBy=&sortDir=&page=&pageSize=
app.get('/categories', (req, res) => {
  let result = [...categories];
  const { title, sortBy = 'title', sortDir = 'asc', page = 1, pageSize = 10 } = req.query;

  if (title) result = result.filter(c => c.title.toLowerCase().includes(title.toLowerCase()));

  if (sortBy) {
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const paged = paginate(result, Number(page), Number(pageSize));
  res.json(paged);
});

// POST /categories
app.post('/categories', (req, res) => {
  const { title, description } = req.body;
  const category = {
    id: categoryIdCounter++,
    title,
    description
  };
  categories.push(category);
  res.status(201).json(category);
});

// GET /categories/:id
app.get('/categories/:id', (req, res) => {
  const category = categories.find(c => c.id === Number(req.params.id));
  if (!category) return res.status(404).json({ error: 'Category not found' });
  // Add tasks for this category
  const categoryTasks = tasks.filter(t => t.categoryId === category.id);
  res.json({ ...category, tasks: categoryTasks });
});

// PUT /categories/:id
app.put('/categories/:id', (req, res) => {
  const idx = categories.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  categories[idx] = { ...categories[idx], ...req.body };
  res.json(categories[idx]);
});

// DELETE /categories/:id
app.delete('/categories/:id', (req, res) => {
  const idx = categories.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  // Remove category from tasks
  tasks = tasks.map(t => t.categoryId === categories[idx].id ? { ...t, categoryId: null } : t);
  categories.splice(idx, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Task Manager backend running on http://localhost:${PORT}`);
}); 