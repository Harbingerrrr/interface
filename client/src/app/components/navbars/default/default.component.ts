import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.css'
})
export class DefaultComponent {
  constructor(public router: Router) { }
  ngOnInit(): void {}

  async auth() {
    window.location.href = "http://localhost:3000/api/auth/login"
  }

}
