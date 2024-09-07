# Comandos

## Añadir comandos

Agregar un comando es sencillo. Sigue estos pasos:

1. Dirígete a la carpeta `src/commands/command-list`. Allí encontrarás subcarpetas como `help`, `moderation`, y `ping`, entre otras, con archivos `.ts` que el bot cargará automáticamente.
2. Para añadir un nuevo comando, crea una nueva subcarpeta dentro de `command-list` y añade un archivo `.ts` en ella.

Este archivo se cargará automáticamente al guardar cambios si estás en modo desarrollo. De lo contrario, asegúrate de generar una nueva build tras cada cambio.

## Estructura de un nuevo comando

Para crear un nuevo comando, sigue esta estructura básica:

1. **Define el comando**: Utiliza `SlashCommandBuilder` para configurar el nombre y la descripción del comando.
2. **Implementa la lógica del comando**: Crea una función `run` que reciba el cliente (`client`) y la interacción (`interaction`) como parámetros.
3. **Envía una respuesta**: Usa `interaction.reply` para enviar una respuesta al usuario. Puedes usar `EmbedBuilder` para mensajes enriquecidos.

Aquí tienes un ejemplo de un comando básico `ping`:

```typescript
const pingCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('ping') // Nombre del comando
    .setDescription('Shows server latency'), // Descripción del comando
  run: async (client: ExtendedClient, interaction: CommandInteraction) => {
    const ping = client.ws.ping; // Obtén el ping del cliente
    const embed = new EmbedBuilder()
      .setColor(getColorByPing(ping)) // Configura el color basado en el ping
      .setTitle('Latency') // Título del mensaje
      .setDescription(`The latency of **${client.user?.username}** is **${ping}ms**`); // Descripción del mensaje

    await interaction.reply({ embeds: [embed] }); // Envía la respuesta al usuario
  }
};
```

**Pasos resumidos**:

1. Crea un archivo `.ts` en la subcarpeta correspondiente de `command-list`.
2. Define el comando con `SlashCommandBuilder`.
3. Implementa la función `run` para manejar la lógica del comando.
4. Envía una respuesta con `interaction.reply` y utiliza `EmbedBuilder` si es necesario.

---

Aquí encontrarás información sobre cómo editar respuestas, hacer respuestas efímeras, decorar mensajes, y añadir botones, selectores y otros componentes: [Documentación discord.js](https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses).