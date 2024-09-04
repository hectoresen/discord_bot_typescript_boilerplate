import ExtendedClient from '../../client/interfaces/discord-extended.interface';
import CommandHandler from '../../commands/handler';
import { ConsoleStatusHandler } from '../../common/console.status.handler';

const interactionCreateEvent = {
  data: {
    name: 'interactionCreate',
    once: false,
  },
  execute: async (client: ExtendedClient, interaction: any) => {
    const commandHandler = new CommandHandler();
    const command = commandHandler.getCommands().get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction);
    } catch (error) {
      interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
      new ConsoleStatusHandler('🤖', `${error}`, 'error');
    }
  }
};

export default interactionCreateEvent;
