import ClientManager from './client/managers/client.manager';
class Main {
    clientManager;
    constructor() {
        this.clientManager = new ClientManager();
    }
    ;
    async start() {
        await this.clientManager.initialize();
    }
}
const main = new Main();
main.start();
