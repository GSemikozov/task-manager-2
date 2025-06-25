import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TaskStateService } from '../../services/task-state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskList implements OnInit, OnDestroy {
  tasks: Task[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
  statusFilter = '';
  titleFilter = '';
  sortBy = 'dueDate';
  sortDir = 'asc';
  loading = false;
  private destroy$ = new Subject<void>();

  statusOptions = ['To Do', 'In Progress', 'Done'];

  constructor(
    private taskService: TaskService,
    private taskState: TaskStateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks({
      status: this.statusFilter || undefined,
      title: this.titleFilter || undefined,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      page: this.page,
      pageSize: this.pageSize
    }).subscribe(res => {
      this.tasks = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  onFilterChange() {
    this.page = 1;
    this.loadTasks();
  }

  onSortChange(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortDir = 'asc';
    }
    this.loadTasks();
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task.id).subscribe();
      }
    });
  }

  createTask() {
    this.router.navigate(['/tasks/new']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
