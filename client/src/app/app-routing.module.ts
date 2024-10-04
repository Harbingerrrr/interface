import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// home page (not authenticated)
import { HomeComponent } from './components/home/home.component';

// authenticated routes
import { HomeComponent as DashboardComponent } from './components/dashboard/home/home.component'

import { HomeComponent as GroupsComponent } from './components/dashboard/groups/home/groups.component'


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    { path: 'dashboard', component: DashboardComponent },
    
    { path: 'dashboard/groups', component: GroupsComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }