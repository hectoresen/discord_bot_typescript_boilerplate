import { Client, DiscordAPIError } from 'discord.js';
import ExtendedClient from './interfaces/discord-extended.interface';
import { discordClientAuth, discordClientConfig } from './config/discord-config';
import { ConsoleStatusHandler } from '../common/console.status.handler';
import { secretConfigService } from '../common/secret-config.service';
import SecretConfigServiceInterface from '../common/interfaces/secret-config-service.interface';

export default class DiscordClient {
  private client: ExtendedClient;
  private botIcon: string = '🤖';
  private configService: SecretConfigServiceInterface;

  constructor() {
    this.client = new Client(discordClientConfig);
    this.configService = secretConfigService;
  }

  public async initialize (): Promise<void> {
    await this.login();
  }

  private async login(): Promise<void> {
    //TOD@ login
    new ConsoleStatusHandler(this.botIcon, 'Client is connecting...', 'loading');
    
    await this.client.login(discordClientAuth.token)
      .then(() => new ConsoleStatusHandler(this.botIcon, `${this.client.user?.username} is running`, 'ok'))
      .catch((error: DiscordAPIError) => new ConsoleStatusHandler(this.botIcon, `Bot login error - ${error}`, 'error'));
  }

  private async loadCommands(): Promise<void> {
    //TOD@ load commands
  }

  private async loadEvents(): Promise<void> {
    //TOD@ load events
  }
}