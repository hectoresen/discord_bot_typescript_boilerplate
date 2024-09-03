export default interface SecretConfigServiceInterface {
    readonly discordConfig: {
        token: string;
        clientId: string;
    };
};
