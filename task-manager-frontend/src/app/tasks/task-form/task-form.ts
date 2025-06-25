import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { TaskStateService } from '../../services/task-state.service';
import { CategoryStateService } from '../../services/category-state.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnInit {
  task$: Observable<Task | Partial<Task>> = of({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do' as 'To Do',
    categoryId: null
  });
  categories: Category[] = [];
  isEdit = false;
  statusOptions = ['To Do', 'In Progress', 'Done'];
  private taskSubject = new BehaviorSubject<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do' as 'To Do',
    categoryId: null
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private taskState: TaskStateService,
    private categoryState: CategoryStateService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories({ pageSize: 100 }).subscribe(res => {
      this.categories = res.data;
      this.categoryState.setCategories(res.data);
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.task$ = this.taskService.getTask(+id).pipe(
        tap(task => this.taskSubject.next(task)),
        catchError(() => {
          // Optionally handle error
          return of({
            title: '',
            description: '',
            dueDate: '',
            status: 'To Do' as 'To Do',
            categoryId: null
          });
        })
      );
    } else {
      this.task$ = this.taskSubject.asObservable();
    }
  }

  saveTask(task: Partial<Task>) {
    if (this.isEdit && task.id) {
      this.taskService.updateTask(task.id, task).subscribe(updated => {
        this.taskState.updateTask(updated);
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(task).subscribe(created => {
        this.taskState.addTask(created);
        this.router.navigate(['/tasks']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
