import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';
import { secretConfigService } from 'src/common/secret-config.service';
import { ConsoleStatusHandler } from 'src/common/console.status.handler';

const roles = secretConfigService.discordRoles;

const timeoutCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Mute a user for a specified amount of time (Administrators or moderators only)')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The member to mute')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('duration')
        .setDescription('Duration of the timeout in minutes')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(120)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the timeout')
        .setRequired(false)
    ),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    // Check if the user has the admin or moderator role
    const member = interaction.guild?.members.cache.get(interaction.user.id);
    if (!member || (!member.roles.cache.has(roles.adminRoleId) && !member.roles.cache.has(roles.moderatorRoleId))) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    // Get the target user, duration, and reason from options
    const userTarget = interaction.options.get('target');
    const durationOption = interaction.options.get('duration');
    const reason = interaction.options.get('reason')

    if (!userTarget || !durationOption) {
      return interaction.reply('You must specify a user and a duration.');
    }

    // Convert duration to milliseconds (Discord uses milliseconds for timeouts)
    const duration = durationOption.value as number;
    const timeoutDuration = duration * 60 * 1000; // Minutes to milliseconds

    // Find the member to timeout in the guild
    const memberToTimeout = interaction.guild?.members.cache.get(userTarget.user.id);

    if (!memberToTimeout) {
      return interaction.reply('User not found in the guild.');
    }

    try {
      // Apply the timeout
      await memberToTimeout.timeout(timeoutDuration, 'reason');

      const userDisplayName = userTarget.user.globalName || userTarget.user.username || 'Unknown User';

      const embed = new EmbedBuilder()
        .setColor([255, 102, 0])
        .setTitle('User Muted')
        .addFields(
          { name: 'Muted user', value: userDisplayName, inline: true },
          { name: 'Duration', value: `${duration} minutos`, inline: true },
          { name: 'Reason', value: `${reason.value ?? 'No reason stated'}` }
        )
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });

      await interaction.reply({ embeds: [embed] });
      new ConsoleStatusHandler('⏳', `The user ${userDisplayName} has been muted for ${duration} minutes by ${interaction.user.globalName}`, 'ok');
    } catch (error) {
      new ConsoleStatusHandler('⏳', `${error}`, 'error');
      await interaction.reply({ content: 'An error occurred while muting the user, possibly due to higher role permissions.', ephemeral: true });
    }
  }
};

export default timeoutCommand;
