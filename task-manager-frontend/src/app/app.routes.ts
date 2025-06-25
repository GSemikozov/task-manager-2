import { Routes } from '@angular/router';
import { TaskList } from './tasks/task-list/task-list';
import { TaskForm } from './tasks/task-form/task-form';
import { CategoryList } from './categories/category-list/category-list';
import { CategoryForm } from './categories/category-form/category-form';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  { path: 'tasks/new', component: TaskForm },
  { path: 'tasks/:id/edit', component: TaskForm },
  { path: 'categories', component: CategoryList },
  { path: 'categories/new', component: CategoryForm },
  { path: 'categories/:id/edit', component: CategoryForm },
];
