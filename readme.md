# Discord bot boilerplate (Typescript) 1.0

Default template to start projects with discord.js

### How to start

(1) Make sure you have nvm installed and run `nvm use`, nvm will look for the .nvmrc file to ensure the correct version of the project, make sure you are in the project raid.

(2) Copy the .env.dist file as .env, it is where your environment variables will be defined, the .env file is inside gitignore and it will never be uploaded, remember to add the environment variables without the values ​​to your .env.dist to always have an example in your repository. To do this you can run the following command `cp .env.dist .env`

(3) Go to the discord developer portal, create a new app and copy the token into your .env as the value of the DISCORD_TOKEN variable. [Discord developer portal](https://discord.com/developers/applications).

(4) Within the discord developer portal in the OAuth2 section you can generate a link to invite the bot to your discord server, in scopes for example you can bot and in Administrator permissions, then copy the URL and paste it in your browser, then select your server and that's it.

(5) Once your bot is inside the server you will see it in *offline status*, go to the console in the project raid and run `npm run dev`, you should now see the bot in *online status*.

---

## Customizing your bot
We will configure your presence and messages that are displayed as a preview of the bot, as well as other parameters. Cooming soon

 ### Turn user tracking on or off

> [!WARNING]  
> You may want to disable this option to improve performance on your machine or if you have not warned your users that the data they are sharing is being collected.

It tracks your server members every 5 minutes, in the future this time can be configured.

You can enable or disable user tracking by adding false or true to the `DISCORD_USER_TRACIKING` environment variable depending on your needs, in the future this could write relevant data about your server members to a database or other providers.

Currently it will only write to the console a list of users who are online or offline, you can skip this tracking by setting false as the value of the environment variable.

For this functionality to work correctly you must go to the Discord developer portal and activate `presence intent` and server `members intent` in your application. [Discord developer portal](https://discord.com/developers/applications).

- ### Adding commands
We will add different commands. Cooming soon

- ### Obtaining data from our users
Cooming soon

---