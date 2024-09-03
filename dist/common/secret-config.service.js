import 'dotenv/config';
import { ConsoleStatusHandler } from './console.status.handler';
class SecretConfigService {
    static instance;
    // Private constructor to avoid instantiation outside the class
    constructor() { }
    // Method to get the single instance
    static getInstance() {
        if (!SecretConfigService.instance) {
            SecretConfigService.instance = new SecretConfigService();
        }
        return SecretConfigService.instance;
    }
    get isDevelopment() {
        return process.env.TZ === 'development';
    }
    get isProduction() {
        return process.env.TZ === 'production';
    }
    getString(key, defaultValue = '') {
        const value = process.env[key];
        if (value === undefined) {
            new ConsoleStatusHandler('🤖', `There was an error getting a key - ${key}`, 'error');
            return defaultValue.toString().replace(/\n/g, '\n');
        }
        return value.toString().replace(/\n/g, '\n');
    }
    get discordConfig() {
        return {
            token: this.getString('DISCORD_TOKEN'),
            clientId: this.getString('CLIENT_ID'),
        };
    }
}
// Access to the single instance through a static property
export const secretConfigService = SecretConfigService.getInstance();
