import { ActivityType, ClientOptions, IntentsBitField } from 'discord.js';
import SettingsService from '../../common/settings.service';

const activityTypeMap: { [key: string]: ActivityType } = {
  'Playing': ActivityType.Playing,
  'Streaming': ActivityType.Streaming,
  'Listening': ActivityType.Listening,
  'Watching': ActivityType.Watching,
  'Custom': ActivityType.Custom,
  'Competing': ActivityType.Competing
};

export const getDiscordClientConfig = async (): Promise<ClientOptions> => {
  const discordSettings = await SettingsService.getInstance().getDiscordSettings();
  return {
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildVoiceStates,
      IntentsBitField.Flags.GuildPresences,
    ],
    presence: {
      status: discordSettings.botStatus,
      activities: discordSettings.activities.map(activity => ({
        name: activity.name,
        type: activityTypeMap[activity.type] || ActivityType.Playing,
      }))
    }
  };
};
