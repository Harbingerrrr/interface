import { Routes } from '@angular/router';

import { LandingComponent } from "./components/landing/landing.component"
import { AuthComponent } from "./components/auth/auth.component"
import { HomeComponent } from "./components/dashboard/home/home.component"

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LandingComponent },
    { path: 'auth', component: AuthComponent },
    
    { path: 'dashboard/home', component: HomeComponent },
    { path: 'dashboard/setup', component: HomeComponent },
    { path: 'dashboard/users', component: HomeComponent },
    { path: 'dashboard/user/:id', component: HomeComponent },
    { path: 'dashboard/api', component: HomeComponent },
    { path: 'dashboard/settings', component: HomeComponent },

];
