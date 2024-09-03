import { Client } from 'discord.js';
// @ts-expect-error: Enmap types are not available, and we are bypassing type checking for now.
import Enmap from 'enmap';

export default interface ExtendedClient extends Client {
    data?: Enmap;
};;;;;;;;;;;