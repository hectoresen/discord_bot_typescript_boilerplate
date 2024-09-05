import { ActivityType, ClientOptions, IntentsBitField } from 'discord.js';
import SettingsService from 'src/common/settings.service';

const activityTypeMap: { [key: string]: ActivityType } = {
  'Playing': ActivityType.Playing,
  'Streaming': ActivityType.Streaming,
  'Listening': ActivityType.Listening,
  'Watching': ActivityType.Watching,
  'Custom': ActivityType.Custom,
  'Competing': ActivityType.Competing
};

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
    status: (await SettingsService.getInstance().getDiscordSettings()).botStatus,
    activities: (await SettingsService.getInstance().getDiscordSettings()).activities.map(activity => ({
      name: activity.name,
      type: activityTypeMap[activity.type] || ActivityType.Playing,
    }))
  }
};
