# Task Manager

A modern, full-featured Task Manager web application with an Angular 20+ frontend and a Node.js/Express backend.

---

## Project Structure

```
task-manager-frontend/   # Angular 20+ frontend
  └── README.md          # Frontend-specific documentation
task-manager-backend/    # Node.js/Express backend
  └── README.md          # Backend-specific documentation
```

- See [task-manager-frontend/README.md](./task-manager-frontend/README.md) for frontend setup, features, and usage.
- See [task-manager-backend/README.md](./task-manager-backend/README.md) for backend setup, API, and usage.

---

## Quick Start

1. **Start the backend:**
   ```bash
   cd task-manager-backend
   npm install
   node index.js
   ```
2. **Start the frontend:**
   ```bash
   cd task-manager-frontend
   npm install
   ng serve
   ```
3. Open [http://localhost:4200/](http://localhost:4200/) in your browser.

---

## Features
- Task and category CRUD
- Filtering, sorting, pagination
- Assign/move tasks between categories
- Responsive Angular Material UI
