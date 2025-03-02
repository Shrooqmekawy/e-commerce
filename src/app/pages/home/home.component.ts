import { CategoryService } from './../../core/services/category/category.service';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Productinnerface } from '../../shared/interfaces/productinnerface';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangeiconDirective } from '../../shared/directives/changeheart/changeicon.directive';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
    CurrencyPipe,
    TranslatePipe,
    ChangeiconDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsList = inject(ProductsService);
  private readonly categoryList = inject(CategoryService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly brandsService = inject(BrandsService);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-chevron-right "></i>',
      '<i class="fa fa-chevron-left "></i>',
    ],
    navSpeed: 300,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rtl: true,

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
  };

  customOptionsProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-chevron-right "></i>',
      '<i class="fa fa-chevron-left "></i>',
    ],
    navSpeed: 400,
    autoplayHoverPause: true,
    rtl: true,

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
  };

  customslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1,
    rtl: true,
  };
  products: WritableSignal<Productinnerface[]> = signal([]);
  category: WritableSignal<Icategory[]> = signal([]);
  brands: WritableSignal<Ibrands[]> = signal([]);

  searchTerm: string = '';

  image: string[] = ['/Img/img1.avif', '/Img/img2.avif', '/Img/img6.avif'];

  ngOnInit(): void {
    this.getData();
    this.getCatData();
    this.getbranDta();
  }

  getCatData() {
    this.categoryList.getCategory().subscribe({
      next: (res) => {
        this.category.set(res.data);
      },
    });
  }

  getData(): void {
    this.productsList.getProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
    });
  }

  // cartitem
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
        this.wishlistService.numOfWishlistItem.set(res.data.length);
        this.toastr.success(res.message, 'bazaar');
      },
    });
  }

  // brand
  getbranDta(): void {
    this.brandsService.getBrandData().subscribe({
      next: (res) => {
        this.brands.set(res.data);
      },
    });
  }
}
