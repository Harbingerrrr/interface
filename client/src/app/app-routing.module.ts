import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// home page (not authenticated)
import { HomeComponent } from './components/home/home.component';

// authenticating user
import { AuthComponent } from './components/auth/auth.component';

// authenticated routes
import { HomeComponent as DashboardComponent } from './components/dashboard/home/home.component'
import { RblxComponent } from './components/dashboard/rblx/rblx.component'
import { HomeComponent as GroupsComponent } from './components/dashboard/groups/home/groups.component'


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    { path: 'auth', component: AuthComponent },

    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/rblx', component: RblxComponent },
    { path: 'dashboard/groups', component: GroupsComponent },



    // catch-all route
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }