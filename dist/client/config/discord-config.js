import { ActivityType, IntentsBitField } from 'discord.js';
export const discordClientConfig = {
    intents: [
        // https://discord.com/developers/docs/topics/gateway#list-of-intents
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
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
    token: process.env.DISCORD_TOKEN
};
