import ClientManager from './client/managers/client.manager';

class Main {
  private clientManager: ClientManager;

  constructor () {
    this.clientManager = new ClientManager();
  };

  public async start() {
    await this.clientManager.initialize();
  }
}

const main = new Main();
main.start();
