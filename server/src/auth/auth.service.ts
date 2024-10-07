import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SupabaseService } from 'src/util/supabase/supabase.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: SupabaseService, private elastic: ElasticsearchService, private readonly http: HttpService, private config: ConfigService) { }

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

    async saveOAuthState(obj) {
        await this.elastic.index({
            index: "temp_security",
            body: {
                "state": obj.state,
                "codeVerifier": obj.codeVerifier,
            }
        })
    }

    async searchOAuthState(state) {
        let codeVerifier = ""
        await this.elastic.search({
            index: "temp_security",
            body: {
                query: {
                    match: {
                        state: state
                    }
                }
            }
        }).then(async response => {
            codeVerifier = response.hits.hits[0]["_source"]["codeVerifier"]
            await this.elastic.delete({
                index: "temp_security",
                id: response.hits.hits[0]["_id"]
            })
        }).catch(error => {
            console.error(error)
        })
        return codeVerifier
    }


    async getRBLXUserData(code: string, state: string) {
        const codeVerifier = await this.searchOAuthState(state)
        let url = `https://apis.roblox.com/oauth/v1`
        let data = new URLSearchParams()
        data.append('client_id', `${this.config.get("ROBLOX_CLIENT_ID")}`);
        data.append('client_secret', `${this.config.get("ROBLOX_CLIENT_SECRET")}`);
        data.append('grant_type', 'authorization_code');
        data.append('code_verifier', `${codeVerifier}`);
        data.append('code', `${code}`);

        await this.http.post(`${url}/token`, data.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).subscribe(async response => {
            await this.http.get(`${url}/userinfo`, {
                headers: {
                    'Authorization': `Bearer ${response.data["access_token"]}`
                }
            }).subscribe(async response => {
                console.log(response.data)
                // TODO: save data to database for particular discord id
            })
        })
        


    }
}
