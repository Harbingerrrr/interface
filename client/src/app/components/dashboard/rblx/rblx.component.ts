import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-rblx',
  templateUrl: './rblx.component.html',
  styleUrl: './rblx.component.css'
})
export class RblxComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public users = {}
  
  ngOnInit(): void {
    this.users = this.getUsers()
  }

  async authorize() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    })
    
    return await this.http.post(`${environment.api}/auth/rblx_start`, {}, {headers: headers}).toPromise()
  }

  async getUsers() {
    return {}
  }
}
