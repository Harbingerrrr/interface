import { Controller, Get, Post, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { SupabaseService } from 'src/util/supabase/supabase.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private dashboard: DashboardService, private supa: SupabaseService) {}

    @Get("systemMessage")
    async getSystemMessage() {
        try {
            return this.dashboard.getSystemMessage()
        } catch (error) {
            return "Error getting system message"
        }
    }

    @Get("subscription")
    async getSubscription(@Query("token") tempToken: string) {
        try {
            // let token = await this.supa.getDiscordID(tempToken)
            return this.dashboard.getSubscription(1)
        } catch (error) {
            return { status: false, start: 0, end: 0, discordID: 0, rblxUsers: [] }
        }
    }
}
