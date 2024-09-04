import ExtendedClient from '../../client/interfaces/discord-extended.interface';

export default interface IEvent {
    data: {
        name: string;
        once: boolean;
    };
    execute: (client: ExtendedClient, interaction: any) => void;
};