import { CommandInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from 'discord.js';
import ExtendedClient from '../../client/interfaces/discord-extended.interface';

export default interface ICommand {
    data: SlashCommandBuilder | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder | SlashCommandOptionsOnlyBuilder;
    run: (client: ExtendedClient, interaction: CommandInteraction) => void;
};
