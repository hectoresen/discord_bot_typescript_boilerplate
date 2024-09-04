import DiscordClient from '../discord';
import ClientInterface from './interfaces/client.interface';

export default class ClientManager implements ClientInterface {

  private client: DiscordClient;

  constructor () {
    this.client = DiscordClient.getInstance();
  };

  public async initialize(): Promise<void> {
    await this.client.initialize();
  };
}