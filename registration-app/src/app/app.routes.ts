import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Register } from './register/register';
import { VerifyOtp } from './verify-otp/verify-otp';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './users/users';
import { Products } from './products/products';
import { Sales } from './sales/sales';

import { authGuard } from './auth.guard';

export const routes: Routes = [

  // Register Page
  {
    path: 'register',
    component: Register
  },

  // OTP Verification Page
  {
    path: 'verify-otp',
    component: VerifyOtp
  },

  // Login Page
  {
    path: 'login',
    component: Login
  },

  // Protected Dashboard
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  // Protected Users
  {
    path: 'users',
    component: Users,
    canActivate: [authGuard]
  },

  // Protected Products
  {
    path: 'products',
    component: Products,
    canActivate: [authGuard]
  },

  // Protected Sales
  {
    path: 'sales',
    component: Sales,
    canActivate: [authGuard]
  },

  // Home → Register
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },

  // Unknown URL → Register
  {
    path: '**',
    redirectTo: 'register'
  }

];