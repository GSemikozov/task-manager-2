# Task Manager

A modern, full-featured Task Manager web application built with Angular 20+ (frontend) and Node.js/Express (backend). The app supports task and category management with CRUD, filtering, sorting, pagination, and assignment features, all with a responsive Angular Material UI.

---

## Project Structure

```
task-manager-frontend/   # Angular 20+ frontend (this directory)
task-manager-backend/    # Node.js/Express backend (in-memory storage)
```

### Frontend Structure (src/app)
- `tasks/` — Task list and form components
- `categories/` — Category list and form components
- `services/` — API and state management services
- `models/` — TypeScript interfaces for Task and Category
- `shared/` — Shared UI components (e.g., confirmation dialog)

---

## Features

- **Task Management**
  - Create, view, edit, and delete tasks
  - Assign tasks to categories (or leave unassigned)
  - Move tasks between categories by editing
  - Set due date, status, and description
  - Filter by status, title, and due date
  - Sort by title, due date, or status
  - Paginated task list
  - Material dialogs for delete confirmation

- **Category Management**
  - Create, view, edit, and delete categories
  - Filter and sort categories by title
  - Paginated category list
  - Deleting a category unassigns its tasks

- **Modern UI/UX**
  - Responsive Angular Material design
  - Navigation bar for quick access
  - Async data loading and robust state management
  - Error handling and confirmation dialogs

---

## Getting Started

### Prerequisites
- Node.js 18+ recommended
- npm (comes with Node.js)

### 1. Start the Backend

```
cd task-manager-backend
npm install
node index.js
```
The backend will run at `http://localhost:3000/`.

### 2. Start the Frontend

```
cd task-manager-frontend
npm install
ng serve
```
The frontend will run at `http://localhost:4200/`.

---

## Usage
- Open the frontend in your browser: [http://localhost:4200/](http://localhost:4200/)
- Use the navigation bar to switch between Tasks and Categories
- Create, edit, filter, and manage tasks and categories as needed

---

## API Overview (Backend)
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

## Tech Stack
- **Frontend:** Angular 20+, Angular Material, RxJS
- **Backend:** Node.js, Express, in-memory storage

---

## License
MIT (or as specified)
