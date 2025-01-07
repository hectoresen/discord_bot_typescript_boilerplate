import { Client, DiscordAPIError, REST, Routes } from 'discord.js'
import ExtendedClient from './interfaces/discord-extended.interface'
import { getDiscordClientConfig } from './config/discord-config' // Actualización aquí
import { ConsoleStatusHandler } from '../common/console.status.handler'
import { secretConfigService } from '../common/secret-config.service'
import SecretConfigServiceInterface from '../common/interfaces/secret-config-service.interface'
import CommandHandler from '../commands/handler'
import EventHandler from '../events/handler'
import SettingsService from '../common/settings.service'

export default class DiscordClient {
  private static instance: DiscordClient
  private client: ExtendedClient
  private botIcon: string = '🤖'
  private configService: SecretConfigServiceInterface
  private commandHandler: CommandHandler
  private eventHandler: EventHandler
  private discordSettings: any = null

  private constructor() {
    this.configService = secretConfigService
    this.commandHandler = CommandHandler.getInstance()
  }

  public static async getInstance(): Promise<DiscordClient> {
    if (!DiscordClient.instance) {
      DiscordClient.instance = new DiscordClient()
      await DiscordClient.instance.initializeClient()
    }
    return DiscordClient.instance
  }

  private async initializeClient(): Promise<void> {
    const clientOptions = await getDiscordClientConfig()
    this.client = new Client(clientOptions)
    this.eventHandler = new EventHandler(this.client, this.commandHandler)
  }

  public async initialize(): Promise<void> {
    this.discordSettings =
      await SettingsService.getInstance().getDiscordSettings()
    await this.login()
    await this.loadCommands()
    await this.loadEvents()
  }

  private async login(): Promise<void> {
    new ConsoleStatusHandler(
      this.discordSettings.consoleBotIconLogs,
      'Client is connecting...',
      'loading'
    )

    await this.client
      .login(this.configService.discordConfig.token)
      .then(
        () =>
          new ConsoleStatusHandler(
            this.botIcon,
            `${this.client.user?.username} is running`,
            'ok'
          )
      )
      .catch(
        (error: DiscordAPIError) =>
          new ConsoleStatusHandler(
            this.botIcon,
            `Bot login error - ${error}`,
            'error'
          )
      )
  }

  private async loadCommands(): Promise<void> {
    new ConsoleStatusHandler(
      this.discordSettings.consoleBotIconLogs,
      'Loading commands..',
      'loading'
    )

    const commands = await this.commandHandler.getCommandsFromDirectory()

    try {
      await new REST({ version: '10' })
        .setToken(this.configService.discordConfig.token)
        .put(
          Routes.applicationCommands(this.configService.discordConfig.clientId),
          {
            body: commands.map((command) => command.data.toJSON()),
          }
        )
        .then(
          () =>
            new ConsoleStatusHandler(
              this.botIcon,
              'Commands loaded successfully',
              'ok'
            )
        )
        .catch(
          (error: DiscordAPIError) =>
            new ConsoleStatusHandler(
              this.botIcon,
              `An error occurred while loading the commands - ${error}`,
              'error'
            )
        )
    } catch (error) {
      new ConsoleStatusHandler(
        this.discordSettings.consoleBotIconLogs,
        `Error loading commands - ${error}`,
        'error'
      )
    }
  }

  private async loadEvents(): Promise<void> {
    new ConsoleStatusHandler(this.botIcon, 'Loading events..', 'loading')

    const events = await this.eventHandler.getEventsFromDirectory()

    try {
      events.forEach((event) => {
        if (event.data.once) {
          this.client.once(event.data.name, (interaction: any) => {
            console.log(event.data.name)
            this.eventHandler.execute(event.data.name, interaction)
          })
        } else {
          this.client.on(event.data.name, (interaction: any) => {
            this.eventHandler.execute(event.data.name, interaction)
          })
        }
      })

      new ConsoleStatusHandler(this.botIcon, 'Events loaded successfully', 'ok')
    } catch (error) {
      new ConsoleStatusHandler(
        this.botIcon,
        `An error occurred while loading the commands - ${error}`,
        'error'
      )
    }
  }

  public getClient(): ExtendedClient {
    return this.client
  }
}
