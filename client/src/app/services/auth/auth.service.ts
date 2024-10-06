import { HttpClient, HttpHeaders } from '@angular/common/http';
import { verifyHostBindings } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async verify() {
    const accessToken = localStorage.getItem("access_token")
    
    if (!accessToken) window.location.href = "/"

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    })

    let userData = await this.http.post(`${environment.api}/auth/verify`, {}, {headers}).toPromise()

    return userData === null ? window.location.href = "/" : userData
  }
}
