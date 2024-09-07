# Commands

## Adding Commands

Adding a command is straightforward. Follow these steps:

1. Navigate to the `src/commands/command-list` folder. There you will find subfolders like `help`, `moderation`, and `ping`, among others, with `.ts` files that the bot will load automatically.
2. To add a new command, create a new subfolder within `command-list` and add a `.ts` file in it.

This file will be loaded automatically when you save changes if you are running the bot in development mode. Otherwise, make sure to generate a new build after each change.

## Structure of a New Command

To create a new command, follow this basic structure:

1. **Define the Command**: Use `SlashCommandBuilder` to set up the command's name and description.
2. **Implement the Command Logic**: Create a `run` function that receives the client (`client`) and the interaction (`interaction`) as parameters.
3. **Send a Response**: Use `interaction.reply` to send a response to the user. You can use `EmbedBuilder` for rich messages.

Here is an example of a basic `ping` command:

```typescript
const pingCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('ping') // Command name
    .setDescription('Shows server latency'), // Command description
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const ping = client.ws.ping; // Get the client's ping
    const embed = new EmbedBuilder()
      .setColor(getColorByPing(ping)) // Set color based on ping
      .setTitle('Latency') // Message title
      .setDescription(`The latency of **${client.user?.username}** is **${ping}ms**`); // Message description

    await interaction.reply({ embeds: [embed] }); // Send the response to the user
  }
};
```

**Summary of Steps**:

1. Create a `.ts` file in the appropriate subfolder of `command-list`.
2. Define the command using `SlashCommandBuilder`.
3. Implement the `run` function to handle the command's logic.
4. Send a response using `interaction.reply` and use `EmbedBuilder` if needed.

---

Here you will find information on how to edit responses, make responses ephemeral, decorate messages, and add buttons, selectors, and other components: [discord.js Documentation](https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses).