import { promises as fs } from 'fs';
import * as path from 'path';
import { ConsoleStatusHandler } from './console.status.handler';

export default class SettingsService {
  private static instance: SettingsService;
  private settings: any = null;
  private settingsLoaded: boolean = false;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to get the single instance
  public static getInstance(): SettingsService {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService();
    }

    return SettingsService.instance;
  }
  private async loadSettingsIfNecessary() {
    if (!this.settingsLoaded) {
      await this.setDiscordSettings();
      this.settingsLoaded = true;
    }
  }

  private async setDiscordSettings() {
    try {
      const filePath = path.resolve(process.cwd(), 'discord.settings.json');
      const data = await fs.readFile(filePath, 'utf-8');
      this.settings = JSON.parse(data);

    } catch (error) {
      new ConsoleStatusHandler('💾', `${error}`, 'error');
    }
  }

  public async getDiscordSettings() {
    await this.loadSettingsIfNecessary(); 
    return this.settings;
  }
}