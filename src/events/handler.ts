import { Collection, CommandInteraction } from 'discord.js';
import ExtendedClient from '../client/interfaces/discord-extended.interface';
import CommandHandler from '../commands/handler';
import IEvent from './interfaces/event.interface';
import { getFilesByDir } from '../common/utils/get-files-by-dir';
import { ConsoleStatusHandler } from '../common/console.status.handler';

export default class EventHandler {
  private client: ExtendedClient;
  private commandHandler: CommandHandler;
  private botIcon: string = '🤖';
  private events: Collection<string, IEvent>;
  
  constructor(client: ExtendedClient, commandHandler: CommandHandler) {
    this.client = client;
    this.commandHandler = commandHandler;
    this.events = new Collection<string, IEvent>();
  }

  public async getEventsFromDirectory(): Promise<Collection<string, IEvent>> {
    const collection = new Collection<string, IEvent>();
    const files = await getFilesByDir('event-list', 'events');

    if (!files) return;
    
    files.forEach(file => {
      collection.set(file.data.name, file);
    });

    this.events = collection;
    return collection;
  };

  public async execute(eventName: string, interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    const command = this.commandHandler.getCommands().get(interaction.commandName);
    
    if (!command) {
      await interaction.reply({ content: 'Command not found', ephemeral: true });
      return;
    }
    
    try {
      command.run(this.client, interaction);
    } catch (error) {
      new ConsoleStatusHandler(this.botIcon, `${error}`, 'error');
      interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
    }
  }
}