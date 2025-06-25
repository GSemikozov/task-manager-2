import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryStateService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  setCategories(categories: Category[]) {
    this.categoriesSubject.next(categories);
  }

  addCategory(category: Category) {
    this.categoriesSubject.next([...this.categoriesSubject.value, category]);
  }

  updateCategory(updated: Category) {
    this.categoriesSubject.next(
      this.categoriesSubject.value.map(c => c.id === updated.id ? updated : c)
    );
  }

  removeCategory(id: number) {
    this.categoriesSubject.next(
      this.categoriesSubject.value.filter(c => c.id !== id)
    );
  }
} 