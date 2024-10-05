import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.route.fragment.subscribe(async (fragment: string | null) => {
      if (fragment) {
        const params = new URLSearchParams(fragment)

        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const expiresAt = params.get('expires_at');
        const tokenType = params.get('token_type');

        // @ts-ignore
        localStorage.setItem("access_token", accessToken)
        // @ts-ignore
        localStorage.setItem("refresh_token", refreshToken)
        // @ts-ignore
        localStorage.setItem("expires_at", expiresAt)
        // @ts-ignore
        localStorage.setItem("token_type", tokenType)

        window.location.href="/dashboard"
      }
    })
  }

}
