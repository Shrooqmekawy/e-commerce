import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { ThemeService } from './../../core/services/darkmode/theme.service';
import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translate/translation.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  readonly auth = inject(AuthService);
  readonly cartService = inject(CartService);
  readonly whishlistservice = inject(WishlistService);
  private readonly translationService = inject(TranslationService);
  private readonly translateService = inject(TranslateService);

  isLogin: InputSignal<boolean> = input<boolean>(true);
  isDark!: boolean;
  theme: string = '';
  cartnumber: Signal<number> = computed(() => this.cartService.cartItemCount());
  wishlistnumber: Signal<number> = computed(() =>
    this.whishlistservice.numOfWishlistItem()
  );
  isDropdownOpen: boolean = false;
  isnavOpen: boolean = false;
  ngOnInit(): void {
    this.getnumcart();
    this.getnumlist();
    this.themeService.loadTheme();
    this.isDark = document.documentElement.classList.contains('dark');
  }
  getnumcart(): void {
    this.cartService.getCartItems().subscribe({
      next: (res) => {
        this.cartService.cartItemCount.set(res.numOfCartItems);
      },
    });
  }

  getnumlist(): void {
    this.whishlistservice.getFavItems().subscribe({
      next: (res) => {
        this.whishlistservice.numOfWishlistItem.set(res.data.length);
      },
    });
  }

  getTheme() {
    this.themeService.getTheme();
    this.isDark = document.documentElement.classList.contains('dark');
  }

  // change language
  changedir(lang: string): void {
    this.translationService.changeLanguageTranslation(lang);
    this.isDropdownOpen = false;
  }

  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  togglenavbar() {
    this.isnavOpen = !this.isnavOpen;
  }
}
