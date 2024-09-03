import { Client } from 'discord.js';
import { discordClientAuth, discordClientConfig } from './config/discord-config';
import { ConsoleStatusHandler } from '../common/console.status.handler';
import { secretConfigService } from '../common/secret-config.service';
export default class DiscordClient {
    client;
    botIcon = '🤖';
    configService;
    constructor() {
        this.client = new Client(discordClientConfig);
        this.configService = secretConfigService;
    }
    async initialize() {
        await this.login();
    }
    async login() {
        //TOD@ login
        new ConsoleStatusHandler(this.botIcon, 'Client is connecting...', 'loading');
        await this.client.login(discordClientAuth.token)
            .then(() => new ConsoleStatusHandler(this.botIcon, `${this.client.user?.username} is running`, 'ok'))
            .catch((error) => new ConsoleStatusHandler(this.botIcon, `Bot login error - ${error}`, 'error'));
    }
    async loadCommands() {
        //TOD@ load commands
    }
    async loadEvents() {
        //TOD@ load events
    }
}
