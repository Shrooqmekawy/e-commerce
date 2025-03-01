import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brands: WritableSignal<Ibrands[]> = signal([]);
  page: number = 1;
  ngOnInit(): void {
    this.getbranDta();
  }

  getbranDta(): void {
    this.brandsService.getBrandData().subscribe({
      next: (res) => {
        this.brands.set(res.data);
      },
    });
  }
  getpage(pagenumber: number): void {
    this.page = pagenumber;
  }
}
