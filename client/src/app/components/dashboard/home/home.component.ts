import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service'

interface Subscription {
  status: Boolean;
  start: number,
  end: number,
  discordID: String;
  rblxUsers: Array<Number>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public dashboard: DashboardService) { }

  public systemMessage: String = ""
  public subscription: Subscription = { status: false, start: 0, end: 0, discordID: "", rblxUsers: [] }
  public discordProfile: String = ""
  public rblxUsers: Array<Number> = []

  async ngOnInit() {
    await this.getUser()
    await this.dashboardFill()
  }

  async dashboardFill() {
    await this.dashboard.getSystemMessages().then(response => {
      // @ts-ignore
      this.systemMessage = response.message
    })
    
    // @ts-ignore
    await this.dashboard.getSubscription(localStorage.getItem("access_token")).then(response => {
      // @ts-ignore
      this.subscription = response
      // @ts-ignore
      this.rblxUsers = response.rblxUsers
    })
    return undefined
  }

  async getUser() {
    await this.dashboard.getUser().then(response => {
      if (response === null) {
        localStorage.clear()
        window.location.href = "/"
      }

      // @ts-ignore
      this.discordProfile = response.user_metadata.avatar_url
    })
  }


}
