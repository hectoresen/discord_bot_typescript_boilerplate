import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';
import { secretConfigService } from 'src/common/secret-config.service';
import { ConsoleStatusHandler } from 'src/common/console.status.handler';

const roles = secretConfigService.discordRoles;

const kickCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The member to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(true)
    ),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    // Check if the user has the admin or moderator role
    const member = interaction.guild?.members.cache.get(interaction.user.id);
    if (!member || (!member.roles.cache.has(roles.adminRoleId) && !member.roles.cache.has(roles.moderatorRoleId))) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    // Get the target user and reason from options
    const userTarget = interaction.options.get('target');
    const reason = interaction.options.get('reason');

    if (!userTarget || !reason) {
      return interaction.reply('You must specify a user and a reason.');
    }

    // Find the member to kick in the guild
    const memberToKick = interaction.guild?.members.cache.get(userTarget.user.id);

    if (!memberToKick) {
      return interaction.reply('User not found in the guild.');
    }

    try {
      await memberToKick.kick(reason.value.toString());

      const userDisplayName = userTarget.user.globalName || userTarget.user.username || 'Unknown User';

      const embed = new EmbedBuilder()
      .setColor([255, 102, 0])
        .setTitle('User Kicked')
        .addFields(
          { name: 'Reason', value: reason.value.toString(), inline: true },
          { name: 'Kicked user', value: userDisplayName, inline: true }
        )
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() });

      await interaction.reply({ embeds: [embed] });
      new ConsoleStatusHandler('⚔️', `The user ${userDisplayName} has been kicked by the administrator ${interaction.user.globalName}`, 'ok');
    } catch (error) {
      new ConsoleStatusHandler('⚔️',`${error}`, 'error' );
      await interaction.reply({ content: 'An error occurred while kicking out the user, probably because they have a higher role than the command executor', ephemeral: true });
    }
  }
};

export default kickCommand;
