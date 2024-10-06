import { Controller, Get, Post, Query, Res, Headers, UnauthorizedException} from '@nestjs/common';
import { SupabaseService } from 'src/util/supabase/supabase.service';
import { Response } from 'express'
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly supabase: SupabaseService, private elastic: ElasticsearchService, private authService: AuthService) {}

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

}
