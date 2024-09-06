import DiscordClient from '../discord';
import ClientManagerInterface from './interfaces/client.interface';

export default class ClientManager implements ClientManagerInterface {
  private client: DiscordClient;

  constructor() {}

  public async initialize(): Promise<void> {
    this.client = await DiscordClient.getInstance();
    await this.client.initialize();
  }
}
