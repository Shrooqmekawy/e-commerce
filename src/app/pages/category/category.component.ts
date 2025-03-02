import { TranslatePipe } from '@ngx-translate/core';
import { Icategory } from '../../shared/interfaces/icategory';
import { CategoryService } from './../../core/services/category/category.service';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  categoryitem: WritableSignal<Icategory[]> = signal([]);
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.categoryitem.set(res.data);
      },
    });
  }
}
