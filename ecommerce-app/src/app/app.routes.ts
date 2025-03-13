import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ProductPageComponent } from './products/pages/product-page/product-page.component';
import { LoginPageComponent } from './user/pages/login-page/login-page.component';
import { RegisterPageComponent } from './user/pages/register-page/register-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'product', component: ProductPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: '**', redirectTo: '' }
];
