import { LongSleeveCatalogPageComponent } from './features/products/pages/long-sleeve-catalog-page/long-sleeve-catalog-page.component';
import { HoodieCatalogPageComponent } from './features/products/pages/hoodie-catalog-page/hoodie-catalog-page.component';
import { TShirtCatalogPageComponent } from './features/products/pages/t-shirt-catalog-page/t-shirt-catalog-page.component';
import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ProductPageComponent } from './features/products/pages/product-page/product-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { NewArrivalsPageComponent } from './features/products/pages/new-arrivals-page/new-arrivals-page.component';
import { BestSellersPageComponent } from './features/products/pages/best-sellers-page/best-sellers-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'product/:id', component: ProductPageComponent },
    { path: 't-shirts', component: TShirtCatalogPageComponent },
    { path: 'hoodies', component: HoodieCatalogPageComponent },
    { path: 'long-sleeves', component: LongSleeveCatalogPageComponent },
    { path: 'best-sellers', component: BestSellersPageComponent },
    { path: 'new-arrivals', component: NewArrivalsPageComponent },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/user/pages/profile-page/profile-page.component').then(m => m.ProfilePageComponent)
    },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: '**', redirectTo: '' }
];
