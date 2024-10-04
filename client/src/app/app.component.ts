import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit  {
    constructor(public router: Router,  ) { }
    loggedIn: boolean = true
    ngOnInit(): void {
        // console.log(this.loggedIn)
    }

}
