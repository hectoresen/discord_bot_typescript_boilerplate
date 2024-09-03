import DiscordClient from '../discord';
export default class ClientManager {
    client;
    constructor() {
        this.client = new DiscordClient();
    }
    ;
    async initialize() {
        await this.client.initialize();
    }
    ;
}
