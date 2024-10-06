import { Controller, Post, Headers, Get, Query } from '@nestjs/common';
import { SupabaseService } from 'src/util/supabase/supabase.service';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
    constructor(private supa: SupabaseService, private subscribers: SubscribersService) {}

    @Post("create")
    async create(@Headers("Authorization") auth: String, @Headers("Discord") discordID: number) {
        let accessToken = auth.split(" ")[1]
        let discordIDFromToken = await this.supa.getUser(accessToken)
        if (discordIDFromToken.identities[0].id !== String(discordID)) return undefined
        return this.subscribers.create(discordID)
    }

    @Get("subscription")
    async getSubscription(@Headers("Authorization") auth: String) {
        let accessToken = auth.split(" ")[1]
        let discordID = (await this.supa.getUser(accessToken)).identities[0].id
        return this.subscribers.getSubscription(discordID)
    }
}
