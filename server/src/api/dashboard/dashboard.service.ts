import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class DashboardService {
    constructor(private readonly elastic: ElasticsearchService) {}

    async getSystemMessage() {
        try {
            // let test = this.test()
            return { message: "HI"}
            console.log(test)
            const result = await this.elastic.search({
                index: "system"
            })

            return { message: result.hits.hits[0]["_source"] }
        } catch (error) {
            console.error(error)
        }
    }

    async getSubscription(token: number) {
        if (isNaN(token)) return { status: false, start: 0, end: 0, discordID: `${token}`, rblxUsers: [] }
        
        return 123123
        
        try {
            const result = await this.elastic.search({
                index: "subscribers",
                body: {
                    query: {
                        match: {
                            discordID: token
                        }
                    }
                }
            })

            return result.hits.hits[0]["_source"]
            return { status: true, start: "some time", end: "some other time", discordID: `${token}`, rblxUsers: [] }
            // should look like ^
        } catch (error) {
            console.error(error)
        }
    }

    // async test() {
    //     const response = await this.elastic.index({
    //         index: 'system',
    //         body: {
    //             "message": "Hehe hehe hehehe"
    //         }
    //     })
    //     return response
    // }
}
