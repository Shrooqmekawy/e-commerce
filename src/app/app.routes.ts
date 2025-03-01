import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { Routes } from '@angular/router';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { BlankComponent } from './layout/blank/blank.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'home' },

  {
    path: '',
    component: AuthenticationComponent,
    title: 'authentication',
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'register',
      },
      {
        path: 'forgetpassword',
        loadComponent: () =>
          import('./pages/forgetpassword/forgetpassword.component').then(
            (c) => c.ForgetpasswordComponent
          ),
        title: 'forgetpassword',
      },
    ],
  },

  {
    path: '',
    component: BlankComponent,
    title: 'blank',
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'home',
      },
      {
        path: 'welcome',
        loadComponent: () =>
          import('./pages/welcome/welcome.component').then(
            (c) => c.WelcomeComponent
          ),
        title: 'welcome',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'brand',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'cart',
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./pages/category/category.component').then(
            (c) => c.CategoryComponent
          ),
        title: 'category',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./pages/payment/payment.component').then(
            (c) => c.PaymentComponent
          ),
        title: 'payment',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'product',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
        title: 'wishlist',
      },
      { path: '**', component: NotfoundComponent, title: 'notfound-page' },
    ],
  },
];
