import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient

    constructor(private config: ConfigService) {
        this.supabase = createClient(
            this.config.get("SUPABASE_URL"),
            this.config.get("SUPABASE_KEY")
        )
    }

    async login() {
        const { data, error } = await this.supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: 'http://localhost:3000/auth'
            }
        })
        
        if (error) {
            throw new Error(`${error}`)
        }
        
        return data.url
    }

    async userSession(code: string) {
        const { data, error } = await this.supabase.auth.exchangeCodeForSession(code)
        if (error) throw error
        return data.session
    }

    // TODO: use to verify token 
    async verifyToken(token: string) {
        const { data: {user}} = await this.supabase.auth.getUser(token)

        console.log(user)
        return true
    }
}
