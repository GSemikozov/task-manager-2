# Task Manager Backend

_See the [root README](../README.md) for full project context._

This is the Node.js/Express backend for the Task Manager app. It provides RESTful endpoints and in-memory storage for tasks and categories.

---

## Features
- REST API for tasks and categories
- Filtering, sorting, and pagination
- Assign/move tasks between categories
- In-memory storage (no database required)

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   node index.js
   ```
3. The backend will run at [http://localhost:3000/](http://localhost:3000/)

---

## API Endpoints
- `GET /tasks` — List tasks (with filtering, sorting, pagination)
- `POST /tasks` — Create task
- `GET /tasks/:id` — Get task by ID
- `PUT /tasks/:id` — Update task (including category assignment)
- `DELETE /tasks/:id` — Delete task
- `POST /tasks/:id/assign-category` — Assign/move task to category
- `GET /categories` — List categories (with filtering, sorting, pagination)
- `POST /categories` — Create category
- `GET /categories/:id` — Get category by ID (with tasks)
- `PUT /categories/:id` — Update category
- `DELETE /categories/:id` — Delete category (unassigns tasks)

---

## License
MIT (or as specified) 