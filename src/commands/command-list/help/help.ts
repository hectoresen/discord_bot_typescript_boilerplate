import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import ICommand from '../../interfaces/command.interface';
import ExtendedClient from '../../../client/interfaces/discord-extended.interface';
import CommandHandler from '../../handler';

const commandHandler = CommandHandler.getInstance();

const helpCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands'),
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const commands = commandHandler.getCommands();

    const embed = new EmbedBuilder()
      .setColor([0, 153, 255])
      .setTitle('Commands')
      .setDescription(`List of ${client.user?.username} commands:`);

    commands.forEach(cmd => {
      embed.addFields({
        name: `/${cmd.data.name}`,
        value: cmd.data.description || 'No description',
        inline: false
      });
    });

    await interaction.reply({ embeds: [embed] });
  }
};

export default helpCommand;
