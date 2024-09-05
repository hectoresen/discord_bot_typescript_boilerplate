import { ColorResolvable, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';

const pingRanges: { maxPing: number; color: [number, number, number] }[] = [
  { maxPing: 60, color: [0, 255, 0] },
  { maxPing: 100, color: [255, 191, 0] },
  { maxPing: Infinity, color: [255, 0, 0] }
];

const getColorByPing = (ping: number): ColorResolvable => {
  const range = pingRanges.find(range => ping < range.maxPing);
  return range ? range.color as ColorResolvable : [0, 0, 0] as ColorResolvable; 
};

const pingCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows server latency'),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const ping = client.ws.ping;
    const embed = new EmbedBuilder()
      .setColor(getColorByPing(ping))
      .setTitle('Latency')
      .setDescription(`The latency of **${client.user?.username}** is **${ping}ms**`);

    await interaction.reply({ embeds: [embed] });
  }
};

export default pingCommand;
