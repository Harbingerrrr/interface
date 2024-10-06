import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SubscribersService {
    constructor(private readonly elastic: ElasticsearchService) { }

    async create(discordID: number) {
        let done = false

        // check if user exists at all, errors and fixes itself if index doens't exist
        let response = await this.elastic.search({
            index: "subscribers",
            body: {
                query: {
                    match: {
                        discordID: discordID
                    }
                }
            }
        }).catch(async error => {
            if (error.meta.body.error.type === "index_not_found_exception") {
                await this.elastic.index({
                    index: "subscribers",
                    body: {
                        "status": false,
                        "start": 0,
                        "end": 0,
                        "discordID": discordID,
                        "rblxUsers": []
                    }
                }).then(async response => {
                    console.log(`✅ Created new index: subscribers\nNew user registered: ${discordID}`)
                    done = true
                })
            }
            return undefined
        })

        if (done) return undefined

        if (response.hits.total["value"] === 0) {
            this.elastic.index({
                index: "subscribers",
                body: {
                    "status": false,
                    "start": 0,
                    "end": 0,
                    "discordID": discordID,
                    "rblxUsers": []
                }
            }).then(async response => {
                console.log(`New user registered: ${discordID}`)
            })
        }
        
        return undefined
    }

    async getSubscription(discordID: string) {
        try {
            let response = await this.elastic.search({
                index: "subscribers",
                body: {
                    query: {
                        match: {
                            discordID: discordID
                        }
                    }
                }
            })   
            return response.hits.hits[0]["_source"]
        } catch (error) {
            console.error(error)
            return { status: false, start: 0, end: 0, discordID: discordID, rblxUsers: [] }
        }
    }
}
