import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DefaultComponent as DefaultNavbar } from './components/navbars/default/default.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        DefaultNavbar,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }