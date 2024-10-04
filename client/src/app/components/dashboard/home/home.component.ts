import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private test: DashboardService) {}

  testBtn() {
    this.test.test()
  }

}
