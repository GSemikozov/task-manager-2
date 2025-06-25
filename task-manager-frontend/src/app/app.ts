import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Task Manager</span>
      <span style="flex: 1 1 auto;"></span>
      <a mat-button routerLink="/tasks" routerLinkActive="active-link">Tasks</a>
      <a mat-button routerLink="/categories" routerLinkActive="active-link">Categories</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
    <style>
      .active-link {
        font-weight: bold;
        text-decoration: underline;
      }
    </style>
  `,
  styles: [],
})
export class App {}
