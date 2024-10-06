import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SupabaseService } from 'src/util/supabase/supabase.service';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: SupabaseService, private elastic: ElasticsearchService) { }

    async index(token: number) {

        let temp = await this.elastic.search({
            index: "subscribers",
            body: {
                query: {
                    match: {
                        discordID: token
                    }
                }
            }
        })

        if (temp.hits.hits.length === 1) {
            console.log("There's already a registered user in the DB")
            return undefined
        }

        await this.elastic.index({
            index: "subscribers",
            body: {
                "status": false,
                "start": 0,
                "end": 0,
                "discordID": token,
                "rblxUsers": []
            }
        })
    }


}
