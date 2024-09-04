import { Client, DiscordAPIError, REST, Routes } from 'discord.js';
import ExtendedClient from './interfaces/discord-extended.interface';
import { discordClientConfig } from './config/discord-config';
import { ConsoleStatusHandler } from '../common/console.status.handler';
import { secretConfigService } from '../common/secret-config.service';
import SecretConfigServiceInterface from '../common/interfaces/secret-config-service.interface';
import CommandHandler from '../commands/handler';
import EventHandler from '../events/handler';

export default class DiscordClient {
  private client: ExtendedClient;
  private botIcon: string = '🤖';
  private configService: SecretConfigServiceInterface;
  private commandHandler: CommandHandler;
  private eventHandler: EventHandler;

  constructor() {
    this.client = new Client(discordClientConfig);
    this.configService = secretConfigService;
    this.commandHandler = new CommandHandler();
    this.eventHandler = new EventHandler(this.client, this.commandHandler);
  }

  public async initialize (): Promise<void> {
    await this.login();
    await this.loadCommands();
    await this.loadEvents();
  }

  private async login(): Promise<void> {
    //TOD@ login
    new ConsoleStatusHandler(this.botIcon, 'Client is connecting...', 'loading');
    
    await this.client.login(this.configService.discordConfig.token)
      .then(() => new ConsoleStatusHandler(this.botIcon, `${this.client.user?.username} is running`, 'ok'))
      .catch((error: DiscordAPIError) => new ConsoleStatusHandler(this.botIcon, `Bot login error - ${error}`, 'error'));
  }

  private async loadCommands(): Promise<void> {
    new ConsoleStatusHandler(this.botIcon, 'Loading commands..', 'loading');

    const commands = await this.commandHandler.getCommandsFromDirectory();

    await new REST({ version: '10' })
      .setToken(this.configService.discordConfig.token)
      .put(
        Routes.applicationCommands(this.configService.discordConfig.clientId),
        {
          body: commands.map(command => command.data.toJSON())
        }
      )
      .then(() => new ConsoleStatusHandler(this.botIcon, 'Commands loaded successfully', 'ok'))
      .catch((error: DiscordAPIError) => new ConsoleStatusHandler(this.botIcon, `An error occurred while loading the commands - ${error}`, 'error'));
  }

  private async loadEvents(): Promise<void> {
    new ConsoleStatusHandler(this.botIcon, 'Loading events..', 'loading');

    const events = await this.eventHandler.getEventsFromDirectory();

    try {
      events.forEach(event => {
        if (event.data.once) {
          this.client.once(event.data.name, (interaction: any) => {
            console.log(event.data.name);
            this.eventHandler.execute(event.data.name, interaction);
          }); 
        } else {
          this.client.on(event.data.name, (interaction: any) => {
            this.eventHandler.execute(event.data.name, interaction);
          });
        }
      });

      new ConsoleStatusHandler(this.botIcon, 'Events loaded successfully', 'ok');
    } catch (error) {
      new ConsoleStatusHandler(this.botIcon, `An error occurred while loading the commands - ${error}`, 'error');
    }
  }
}