import cron from 'node-cron';
import DiscordClient from '../client/discord';
import ExtendedClient from '../client/interfaces/discord-extended.interface';
import SecretConfigServiceInterface from '../common/interfaces/secret-config-service.interface';
import { secretConfigService } from '../common/secret-config.service';

export default class MemberTrackingCron {
  private client: ExtendedClient;
  private configService: SecretConfigServiceInterface;

  constructor() {
    this.initialize();
    this.configService = secretConfigService;
  }

  private async initialize(): Promise<void> {
    const discordClient = await DiscordClient.getInstance();
    this.client = discordClient.getClient(); 
    this.setupCronJob();
  }

  private setupCronJob() {
    // Test 10 secs -> '*/10 * * * * *'
    cron.schedule('*/5 * * * *', async () => {
      try {
        const guild = this.client.guilds.cache.get(this.configService.discordConfig.guildId);
        if (!guild) {
          console.error('Guild not found!');
          return;
        }
        const members = await guild.members.fetch();
        const presences = guild.presences.cache;

        const statuses = members
          .filter(member => !member.user.bot) // Exclude bots
          .map(member => {
            const presence = presences.get(member.id); // Get presence from cache

            if (presence) {
              // Extract activity information
              const activities = presence.activities.map(activity => activity.name).join(', ') || 'No activity';
              return `${member.user.username}: ${presence.status} (${activities})`;
            } else {
              return `${member.user.username}: offline`;
            }
          });

        // Log the statuses
        console.log('Member statuses:');
        console.log(statuses.join('\n'));
      } catch (error) {
        console.error('Error fetching guild members:', error);
      }
    });
  }
}
