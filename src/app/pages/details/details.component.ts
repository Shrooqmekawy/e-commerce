import { ProductsService } from './../../core/services/products/products.service';
import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { CartService } from './../../core/services/cart/cart.service';
import { Productinnerface } from './../../shared/interfaces/productinnerface';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangeiconDirective } from '../../shared/directives/changeheart/changeicon.directive';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, TranslatePipe, ChangeiconDirective],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activateroute = inject(ActivatedRoute);
  private readonly productsrevice = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);

  detailsprod: WritableSignal<Productinnerface | null> = signal(null);
  ngOnInit(): void {
    this.activateroute.paramMap.subscribe({
      next: (res) => {
        console.log(res.get('id'));
        let idprod = res.get('id');
        this.productsrevice.getSpecificProducts(idprod!).subscribe({
          next: (res) => {
            this.detailsprod.set(res.data);
          },
        });
      },
    });
  }
  addToCart(id: string): void {
    this.cartService.postCartItems(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'bazaar');
      },
    });
  }
  // whishlist

  postWhishlistItems(id: string): void {
    this.wishlistService.postFavItem(id).subscribe({
      next: (res) => {
        console.log(res.data.length);
        this.wishlistService.numOfWishlistItem.set(res.data.length);
        this.toastr.success(res.message, 'bazaar');
      },
    });
  }
}
