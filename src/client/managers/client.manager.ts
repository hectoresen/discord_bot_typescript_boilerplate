import DiscordClient from '../discord';
import ClientManagerInterface from './interfaces/client.interface';

export default class ClientManager implements ClientManagerInterface {

  private client: DiscordClient;

  constructor () {
    this.client = DiscordClient.getInstance();
  };

  public async initialize(): Promise<void> {
    await this.client.initialize();
  };
}