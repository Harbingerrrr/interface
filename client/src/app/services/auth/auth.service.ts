import { HttpClient, HttpHeaders } from '@angular/common/http';
import { verifyHostBindings } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async verify() {
    const accessToken = localStorage.getItem("access_token")
    
    if (!accessToken) {
      throw new Error("No access token found")
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    })


    let temp = await this.http.get(`http://localhost:3000/api/auth/test`)

    console.log(temp)

  }
}
