import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from '../../shared/interfaces/wishlist';
import { TranslatePipe } from '@ngx-translate/core';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlist = inject(WishlistService);
  private readonly cartservice = inject(CartService);
  private readonly toastr = inject(ToastrService);

  favproducts: WritableSignal<Wishlist[]> = signal([]);

  ngOnInit(): void {
    this.getFavItems();
  }

  getFavItems(): void {
    this.wishlist.getFavItems().subscribe({
      next: (res) => {
        this.favproducts.set(res.data);
      },
    });
  }
  addToCart(id: string): void {
    this.cartservice.postCartItems(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'bazaar');
        this.cartservice.cartItemCount.set(res.numOfCartItems);
      },
    });
  }
  removeitems(id: string): void {
    this.wishlist.removefavItem(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'bazaar');
        this.wishlist.numOfWishlistItem.set(res.data.length);

        this.favproducts.set(res.data);
        this.getFavItems();
      },
    });
  }
}
