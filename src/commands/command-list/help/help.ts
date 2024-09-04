import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';

const helpCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands'),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setColor([0, 153, 255])
      .setTitle('Commands')
      .setDescription(`List of ${client.user?.username} commands :`);

    interaction.reply({ embeds: [embed] });
  }
};

export default helpCommand;