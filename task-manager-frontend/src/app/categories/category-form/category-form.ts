import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoryStateService } from '../../services/category-state.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm implements OnInit {
  category$: Observable<Category | Partial<Category>> = of({
    title: '',
    description: ''
  });
  isEdit = false;
  private categorySubject = new BehaviorSubject<Partial<Category>>({
    title: '',
    description: ''
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private categoryState: CategoryStateService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.category$ = this.categoryService.getCategory(+id).pipe(
        tap(category => this.categorySubject.next(category)),
        catchError(() => {
          // Optionally handle error
          return of({
            title: '',
            description: ''
          });
        })
      );
    } else {
      this.category$ = this.categorySubject.asObservable();
    }
  }

  saveCategory(category: Partial<Category>) {
    if (this.isEdit && category.id) {
      this.categoryService.updateCategory(category.id, category).subscribe(updated => {
        this.categoryState.updateCategory(updated);
        this.router.navigate(['/categories']);
      });
    } else {
      this.categoryService.createCategory(category).subscribe(created => {
        this.categoryState.addCategory(created);
        this.router.navigate(['/categories']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/categories']);
  }
}
