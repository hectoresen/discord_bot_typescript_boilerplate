import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';
import { ConsoleStatusHandler } from 'src/common/console.status.handler';

const channelSummary: ICommand = {
  data: new SlashCommandBuilder()
    .setName('channel-summary')
    .setDescription('Shows a brief summary of the Twitch channel for the last 30 days.')
    .addStringOption(option =>
      option
        .setName('channel')
        .setDescription('The Twitch channel name')
        .setRequired(true)
    ),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const channelName = interaction.options.get('channel');

    if (!channelName.value) {
      return interaction.reply({ content: 'Please provide a valid Twitch channel name.', ephemeral: true });
    }

    try {
      const response = await axios.get(`https://twitchtracker.com/api/channels/summary/${channelName.value}`);
      const data = response.data;

      if (Object.entries(data).length === 0) {
        return await interaction.reply({ content: `No channel found with the name: ${channelName.value}`, ephemeral: true})
      };

      const embed = new EmbedBuilder()
        .setColor([100, 65, 165])
        .setTitle(`Channel Summary for ${channelName.value}`)
        .addFields(
          { name: 'Rank', value: data.rank.toString(), inline: true },
          { name: 'Minutes Streamed', value: data.minutes_streamed.toString(), inline: true },
          { name: 'Average Viewers', value: data.avg_viewers.toString(), inline: true },
          { name: 'Max Viewers', value: data.max_viewers.toString(), inline: true },
          { name: 'Hours Watched', value: data.hours_watched.toString(), inline: true },
          { name: 'Followers', value: data.followers.toString(), inline: true },
          { name: 'Total Followers', value: data.followers_total.toString(), inline: true },
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

export default channelSummary;
