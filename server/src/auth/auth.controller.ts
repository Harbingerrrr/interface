import { Controller, Get, Post, Query, Res, Headers, UnauthorizedException} from '@nestjs/common';
import { SupabaseService } from 'src/util/supabase/supabase.service';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly supabase: SupabaseService) {}

    @Get('login')
    async auth(@Res() res: Response) {
        const discordLoginURL = await this.supabase.login()
        return res.redirect(discordLoginURL)
    }

    @Post('verify')
    async verify(@Res() res: Response, @Headers('authorization') auth: string) {
        console.log("gets here")
        const accessToken = auth.split(' ')[1]
        if (!accessToken) return false
        return this.supabase.verifyToken(accessToken)
    }

}
