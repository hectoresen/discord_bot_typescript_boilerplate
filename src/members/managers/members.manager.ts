import SecretConfigServiceInterface from 'src/common/interfaces/secret-config-service.interface';
import { secretConfigService } from 'src/common/secret-config.service';
import MemberTrackingCron from '../members.tracker';
import MembersManagerInterface from './interfaces/members.manager.interface';
import { ConsoleStatusHandler } from 'src/common/console.status.handler';

export default class MembersManager implements MembersManagerInterface {
  private static instance: MembersManager;
  private configService: SecretConfigServiceInterface;
  private botIcon: string = '🤖';

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.configService = secretConfigService;
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

    if (isActive) {
      new MemberTrackingCron();
      new ConsoleStatusHandler(this.botIcon, 'Member tracking initialized.', 'ok');
    }
  }
}