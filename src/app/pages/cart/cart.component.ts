import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartservice = inject(CartService);

  cartItem: Icart = {} as Icart;

  ngOnInit(): void {
    this.getItem();
  }
  getItem(): void {
    this.cartservice.getCartItems().subscribe({
      next: (res) => {
        this.cartItem = res.data;
        localStorage.setItem('cartId', this.cartItem._id);
      },
    });
  }
  removeItem(id: string): void {
    this.cartservice.removeCartItems(id).subscribe({
      next: (res) => {
        this.cartItem = res.data;
        this.cartservice.cartItemCount.set(res.numOfCartItems);
      },
    });
  }
  updateItem(id: string, count: number): void {
    this.cartservice.updateCartItem(id, count).subscribe({
      next: (res) => {
        this.cartItem = res.data;
        this.cartservice.cartItemCount.set(res.numOfCartItems);
      },
    });
  }
  clearItem(): void {
    this.cartservice.clearCartItems().subscribe({
      next: (res) => {
        if (res.message == 'bazaar') {
          this.cartItem = {} as Icart;
          this.cartservice.cartItemCount.set(0);
        }
      },
    });
  }
}
