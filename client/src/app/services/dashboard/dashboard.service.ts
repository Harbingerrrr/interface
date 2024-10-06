import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: HttpClient) { }

  async getSystemMessages() {
    try {
      return this.http.get(`${environment.api}/dashboard/systemMessage`).toPromise()
    } catch (error) {
      return "Error getting system message"
    }
  }

  async getSubscription(token: String) {
    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
      return this.http.get(`${environment.api}/subscribers/subscription`, {headers: headers}).toPromise()
    } catch (error) {
      return { status: false, start: 0, end: 0, discordID: 0, rblxUsers: [] }
    }
  }

  async getUser() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    })
    let response = this.http.get(`${environment.api}/auth/user`, { headers: headers }).toPromise()
    return response == null ? null : response 
  }


}
