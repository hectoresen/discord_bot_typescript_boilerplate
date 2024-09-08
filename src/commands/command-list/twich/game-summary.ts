import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';
import { ConsoleStatusHandler } from 'src/common/console.status.handler';

const gameSummary: ICommand = {
  data: new SlashCommandBuilder()
    .setName('game-summary')
    .setDescription('Shows a brief summary of the Twitch game for the last 30 days.')
    .addStringOption(option =>
      option
        .setName('game')
        .setDescription('Game name')
        .setRequired(true)
    ),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const gameName = interaction.options.get('game');

    if (!gameName.value) {
      return interaction.reply({ content: 'Please provide a valid Twitch channel name.', ephemeral: true });
    }

    try {
      const response = await axios.get(`https://twitchtracker.com/api/games/summary/${gameName.value}`);
      const data = response.data;

      if (Object.entries(data).length === 0) {
        return await interaction.reply({ content: `No channel found with the name: ${gameName.value}`, ephemeral: true})
      };

      const embed = new EmbedBuilder()
        .setColor([100, 65, 165])
        .setTitle(`Channel Summary for ${gameName.value}`)
        .addFields(
          { name: 'Rank', value: data.rank.toString(), inline: false },
          { name: 'Hours Watched', value: data.hours_watched.toString(), inline: false },
          { name: 'Average Viewers', value: data.avg_viewers.toString(), inline: false },
          { name: 'Average Channels', value: data.avg_channels.toString(), inline: false },
          { name: 'Powered by', value: '[TwitchTracker.com](https://twitchtracker.com)', inline: false }
        )
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      new ConsoleStatusHandler('💽', `Error getting data from a twitch channel - ${error}`, 'error')
      await interaction.reply({ content: 'An error occurred while fetching the channel summary.', ephemeral: true });
    }
  }
};

export default gameSummary;
