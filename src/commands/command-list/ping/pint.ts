import { ColorResolvable, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';

const getColorByPing = (ping: number): ColorResolvable => {
  if (ping < 60) {
    return [0, 255, 0];
  }
  if (ping < 100) {
    return [255, 191, 0];
  }
  if (ping > 100) {
    return [255, 0, 0];
  }

  return [0, 0, 0];
};

const pingCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows server latency'),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setColor(getColorByPing(client.ws.ping))
      .setTitle('latency')
      .setDescription(`The latency of **${client.user?.username}** is **${client.ws.ping}ms**`);

    interaction.reply({ embeds: [embed] });
  }
};

export default pingCommand;