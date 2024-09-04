import { Collection } from 'discord.js';
import ICommand from './interfaces/command.interface';
import { getFilesByDir } from '../common/utils/get-files-by-dir';

export default class CommandHandler {
  private commands: Collection<string, ICommand>;

  constructor() {
    this.commands = new Collection<string, ICommand>;
  }

  public async getCommandsFromDirectory(): Promise<Collection<string, ICommand>> {
    const collection = new Collection<string, ICommand>();
    const files = await getFilesByDir('command-list', 'commands');

    files.forEach(file => collection.set(file.data.name, file));

    this.commands = collection;

    return collection;
  };

  public getCommands() {
    return this.commands;
  };
}