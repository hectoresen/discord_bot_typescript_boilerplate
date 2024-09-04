import { ActivityType, ClientOptions, IntentsBitField } from 'discord.js';
import { secretConfigService } from '../../common/secret-config.service';

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

export const discordClientAuth = {
  token: secretConfigService.discordConfig.token
};