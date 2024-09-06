import SecretConfigServiceInterface from '../../common/interfaces/secret-config-service.interface';
import { secretConfigService } from '../../common/secret-config.service';
import MemberTrackingCron from '../members.tracker';
import MembersManagerInterface from './interfaces/members.manager.interface';
import { ConsoleStatusHandler } from '../../common/console.status.handler';;
import SettingsServiceInterface from '../../common/interfaces/settings-service.interface';
import SettingsService from '../../common/settings.service';

export default class MembersManager implements MembersManagerInterface {
  private static instance: MembersManager;
  private configService: SecretConfigServiceInterface;
  private discordSettings: SettingsServiceInterface

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.configService = secretConfigService;
    this.discordSettings = SettingsService.getInstance()
  }

  // Static method to get the single instance
  public static getInstance(): MembersManager {
    if (!MembersManager.instance) {
      MembersManager.instance = new MembersManager();
    }
    return MembersManager.instance;
  }

  public async initializeMemberTracking(): Promise<void> {
    const isActive = this.configService.discordConfig.userTracking;

    const settings = await this.discordSettings.getDiscordSettings();
    if (isActive) {
      new MemberTrackingCron();
      new ConsoleStatusHandler(settings.consoleBotIconLogs, 'Member tracking initialized.', 'ok');
    }
  }
}