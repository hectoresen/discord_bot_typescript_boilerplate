export default interface SecretConfigServiceInterface {
    readonly discordConfig: {
        token: string;
        clientId: string;
        guildId: string;
        userTracking: boolean;
    };

    readonly discordRoles: {
        adminRoleId: string;
        moderatorRoleId: string;
    }
};
