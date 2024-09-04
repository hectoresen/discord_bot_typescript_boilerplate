import ClientManager from './client/managers/client.manager';
import ClientManagerInterface from './client/managers/interfaces/client.interface';
import MembersManagerInterface from './members/managers/interfaces/members.manager.interface';
import MembersManager from './members/managers/members.manager';

class Main {
  private clientManager: ClientManagerInterface;
  private membersManager: MembersManagerInterface

  constructor () {
    this.clientManager = new ClientManager();
    this.membersManager = MembersManager.getInstance();
  };

  public async start() {
    await this.clientManager.initialize();
    await this.membersManager.initializeMemberTracking();
  }
}

const main = new Main();
main.start();
