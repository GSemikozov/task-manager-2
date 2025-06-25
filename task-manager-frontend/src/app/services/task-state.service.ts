import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskStateService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  setTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
  }

  addTask(task: Task) {
    this.tasksSubject.next([...this.tasksSubject.value, task]);
  }

  updateTask(updated: Task) {
    this.tasksSubject.next(
      this.tasksSubject.value.map(t => t.id === updated.id ? updated : t)
    );
  }

  removeTask(id: number) {
    this.tasksSubject.next(
      this.tasksSubject.value.filter(t => t.id !== id)
    );
  }
} 