import { ActivityType, ClientOptions, IntentsBitField } from 'discord.js';

export const discordClientConfig: ClientOptions = {
  intents: [
    // https://discord.com/developers/docs/topics/gateway#list-of-intents
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildPresences
  ],
  presence: {
    status: 'online',
    activities: [
      {
        name: '/help',
        type: ActivityType.Listening
      }
    ]
  }
};