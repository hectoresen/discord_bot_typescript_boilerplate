import 'dotenv/config';
import { ConsoleStatusHandler } from './console.status.handler';
import SecretConfigServiceInterface from './interfaces/secret-config-service.interface';
import SettingsServiceInterface from './interfaces/settings-service.interface';
import SettingsService from './settings.service';

class SecretConfigService implements SecretConfigServiceInterface {
  private static instance: SecretConfigService;
  private discordSettings: SettingsServiceInterface

  // Private constructor to avoid instantiation outside the class
  private constructor() {
    this.discordSettings = SettingsService.getInstance()
  }

  // Method to get the single instance
  public static getInstance(): SecretConfigService {
    if (!SecretConfigService.instance) {
      SecretConfigService.instance = new SecretConfigService();
    }
    return SecretConfigService.instance;
  }

  get isDevelopment(): boolean {
    return process.env.TZ === 'development';
  }

  get isProduction(): boolean {
    return process.env.TZ === 'production';
  }

  private getString(key: string, defaultValue: string = ''): string {
    const value = process.env[key];

    if (value === undefined) {
      new ConsoleStatusHandler('🤖', `There was an error getting a key - ${key}`, 'error');
      return defaultValue.toString().replace(/\n/g, '\n');
    }

    return value.toString().replace(/\n/g, '\n');
  }

  private getBoolean(key: string, defaultValue: boolean = false): boolean {
    const value = process.env[key];
    if (value === undefined) {
      new ConsoleStatusHandler('🤖', `There was an error getting a key - ${key}`, 'error');
      return defaultValue;
    }

    try {
      return JSON.parse(value.toLowerCase());
    } catch (error) {
      new ConsoleStatusHandler('🤖', `Invalid boolean value for key - ${key}: ${value} - ${error}`, 'error');
      return defaultValue;
    }
  }

  get discordConfig() {
    return {
      token: this.getString('DISCORD_TOKEN'),
      clientId: this.getString('DISCORD_CLIENT_ID'),
      guildId: this.getString('DISCORD_GUILD_ID'),
      userTracking: this.getBoolean('DISCORD_USER_TRACKING')
    };
  }

  get discordRoles() {
    return {
      adminRoleId: this.getString('DISCORD_ADMIN_ROLE_ID'),
      moderatorRoleId: this.getString('DISCORD_MODERATOR_ROLE_ID')
    }
  }
}

// Access to the single instance through a static property
export const secretConfigService = SecretConfigService.getInstance();
