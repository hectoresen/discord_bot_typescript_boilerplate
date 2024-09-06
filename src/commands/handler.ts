import { Collection } from 'discord.js';
import ICommand from './interfaces/command.interface';
import { getFilesByDir } from '../common/utils/get-files-by-dir';

export default class CommandHandler {
  private static instance: CommandHandler | null = null;
  private commands: Collection<string, ICommand>;

  // Private constructor to avoid creating external instances
  private constructor() {
    this.commands = new Collection<string, ICommand>();
  }

  // Static method to get the single CommandHandler instance
  public static getInstance(): CommandHandler {
    if (!CommandHandler.instance) {
      CommandHandler.instance = new CommandHandler();
    }
    return CommandHandler.instance;
  }

  public async getCommandsFromDirectory(): Promise<Collection<string, ICommand>> {
    const collection = new Collection<string, ICommand>();
    const files = await getFilesByDir('command-list', 'commands');

    if (!files) return;
  
    files.forEach(file => {
      collection.set(file.data.name, file);
    });
  
    this.commands = collection;
  
    return collection;
  }

  public getCommands(): Collection<string, ICommand> {
    return this.commands;
  }
}
