import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Productinnerface } from '../../shared/interfaces/productinnerface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangeiconDirective } from '../../shared/directives/changeheart/changeicon.directive';

@Component({
  selector: 'app-products',
  imports: [
    RouterLink,
    SearchPipe,
    FormsModule,
    CurrencyPipe,
    TranslatePipe,
    ChangeiconDirective,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productsList = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  products: WritableSignal<Productinnerface[]> = signal([]);

  searchTerm: string = '';
  page: number = 1;

  getData(): void {
    this.productsList.getProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
    });
  }
  ngOnInit(): void {
    this.getData();
  }
  addToCart(id: string): void {
    this.cartService.postCartItems(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'bazaar');
        this.cartService.cartItemCount.set(res.numOfCartItems);
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
  getpage(pagenumber: number): void {
    this.page = pagenumber;
  }
}
