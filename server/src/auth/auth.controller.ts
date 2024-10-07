import { ConfigService } from '@nestjs/config';
import { Controller, Get, Post, Query, Res, Headers, UnauthorizedException, Req} from '@nestjs/common';
import { SupabaseService } from 'src/util/supabase/supabase.service';
import { Response } from 'express'
import { AuthService } from './auth.service';
const crypto = require("crypto")

@Controller('auth')
export class AuthController {
    constructor(private readonly supabase: SupabaseService, private authService: AuthService, private config: ConfigService) {}

    @Get('login')
    async auth(@Res() res: Response) {
        const discordLoginURL = await this.supabase.login()
        return res.redirect(discordLoginURL)
    }

    @Post('verify')
    async verify(@Headers('Authorization') auth: string) {
        const accessToken = auth.split(' ')[1]
        if (!accessToken) return null
        return this.supabase.verifyToken(accessToken)
    }

    @Get('user')
    async getUser(@Headers('Authorization') auth: string) {
        const accessToken = auth.split(' ')[1]
        if (!accessToken) return null
        return this.supabase.getUser(accessToken)
    }

    @Post('rblx_start')
    async startRBLXVerification(@Headers('Authorization') auth: string, @Res() res: Response) {
        const accessToken = auth.split(' ')[1]
        if (!accessToken) return null
        await this.supabase.verifyToken(accessToken).then(async response => {
            if (response == null) {
                res.redirect("http://localhost:3000/")
            }
        })

        const clientId = this.config.get("ROBLOX_CLIENT_ID");
        const callback = "http://localhost:3000/api/auth/rblx_callback"
        const codeVerifier = crypto.randomBytes(32).toString('base64url');
        const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url')
        const state = crypto.randomBytes(16).toString('hex')

        // temp store, will delete on success callback
        this.authService.saveOAuthState({state: state, codeVerifier: codeVerifier})

        console.log(`https://apis.roblox.com/oauth/v1/authorize?client_id=${clientId}&code_challenge=${codeChallenge}&code_challenge_method=S256&redirect_uri=${callback}&scope=openid%20profile&response_type=code&state=${state}`)
    }
        // res.redirect(`https://apis.roblox.com/oauth/v1/authorize?client_id=${clientId}&redirect_uri=${callback}&scope=openid`)

        // const robloxAuthUrl = `https://roblox.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`;
        // let url = 
        // &redirect_uri=https://my-app.com/redirect&scope=openid&response_type=code&nonce=12345&state=6789


    @Get('rblx_callback')
    async getToken(@Query("code") code: string, @Query("state") state: string) {
        this.authService.getRBLXUserData(code, state)
        // console.log("send user to dashboard/rblx")
    }

    

}
