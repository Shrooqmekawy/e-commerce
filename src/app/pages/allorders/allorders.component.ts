import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AllordersService } from '../../core/services/allorders/allorders.service';
import { Iorder } from '../../shared/interfaces/iorder';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe, TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly orders = inject(AllordersService);

  orderItemsinformaion: WritableSignal<Iorder[]> = signal([]);

  userId: string = '';
  ngOnInit(): void {
    this.userId = localStorage.getItem('userorders')!;
    this.getItem(this.userId);
  }

  getItem(id: string): void {
    this.orders.getOrderAfterPyment(id).subscribe({
      next: (res) => {
        if (this.userId) {
          this.orderItemsinformaion.set(res);
        }
      },
    });
  }
}
