# Discord bot boilerplate (Typescript) 1.0

Discord bot template in TypeScript, with support to run with or without Docker.
This is the English version of the documentation.

[Read this in Spanish](README_es.md)

## How to start

### Initial setup and invitation of the bot to your server

1. Make sure you have nvm installed and run `nvm use`, nvm will look for the .nvmrc file to ensure the correct version of the project, make sure you are in the project raid.

2. Copy the .env.dist file as .env, it is where your environment variables will be defined, the .env file is inside gitignore and it will never be uploaded, remember to add the environment variables without the values ​​to your .env.dist to always have an example in your repository. To do this you can run the following command `cp .env.dist .env`

3. Go to the discord developer portal, create a new app and copy the token into your .env as the value of the `DISCORD_TOKEN` variable. [Discord developer portal](https://discord.com/developers/applications).

4. Within the discord developer portal in the OAuth2 section you can generate a link to invite the bot to your discord server, in scopes for example you can bot and in Administrator permissions, then copy the URL and paste it in your browser, then select your server and that's it.

### Without docker

After completing the steps above, run `npm run dev` to start the bot in development mode. Make sure the `NODE_ENV` environment variable is set to `development`. In this mode, the server will detect any changes to the code and automatically restart the bot to apply the changes.

To start the bot in production mode without Docker, make sure the `NODE_ENV` environment variable is set to `production`. Then run `npm run build` and finally `npm run prod`, which will run the compiled code. Unlike development mode, you must create a new build every time you make changes to the code.

### With docker
This project is configured to work with or without docker.
To start the project in development mode with docker, run the `docker compose up` command. Make sure your `NODE_ENV` environment variable is set to `development` before running the command

If you want to start the project in production mode with docker, modify the environment variable in your .env `NODE_ENV` to `production` and run the docker compose up command.

The difference is that in development mode the bot will listen to the changes you make to the code every time you save and in production mode you must make a new compilation of the code.

---

## Customizing your bot
Customization options will be added over time, at the moment you have the following options available:

> [!NOTE]
> Certain customizations are covered by discord. At all points you will find a link to the official documentation with a list to consult the supported configuration values

- ### Presence

 #### Status
You can configure the presence of your bot in the `discord.settings.json` file.
In this file you will find different variables such as botStatus where you can configure its value as online or AFK among others.

You will find all the values ​​​​supported by discord in this link: [Presence](https://discord.js.org/docs/packages/discord.js/14.16.1/PresenceStatus:TypeAlias).

#### Activities
To modify the activity status of the bot, go to the `discord.settings.json` file, where you can modify the name of the activity and the type of activity.
As a name you can set any value, however for the type of activity (type) you must be strict, only certain values ​​can be added such as Listening, Playing, Watching, etc. You can see the full list here: [Activities](https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType).

- ### Turn user tracking on or off

> [!WARNING]  
> You may want to disable this option to improve performance on your machine or if you have not warned your users that the data they are sharing is being collected.

It tracks your server members every 5 minutes, in the future this time can be configured.

You can enable or disable user tracking by adding false or true to the `DISCORD_USER_TRACIKING` environment variable depending on your needs, in the future this could write relevant data about your server members to a database or other providers.

Currently it will only write to the console a list of users who are online or offline, you can skip this tracking by setting false as the value of the environment variable.

For this functionality to work correctly you must go to the Discord developer portal and activate `presence intent` and server `members intent` in your application. [Discord developer portal](https://discord.com/developers/applications).

- ### Adding commands

This bot includes example commands such as `ping`, `help`, and moderation commands like `kick` and `timeout`, among others. To add your own custom commands, refer to this guide: [Commands](./docs/commands/commands.md).

---

## Moderation

This bot has moderation commands that can be executed by users with administrator or moderator roles.

To enable these roles, go to your Discord server, in the case of an administrator role make sure you check the Administrator box, for moderation roles make sure they have permissions to kick, mute or ban a user, otherwise they will not be able to run said commands due to lack of permissions.

Once you have the roles created, copy their identifiers and paste them into the .env file as values ​​of the `DISCORD_ADMIN_ROLE_ID` and `DISCORD_MODERATOR_ROLE_ID` variables respectively.

Restart the bot to make the changes effective.

> [!IMPORTANT]
> Please note that the bot will only be able to kick other members of the server with roles lower than its own. A moderator cannot kick another moderator or administrator. An administrator cannot kick out other administrators, but he can kick out other moderators. Both roles will be able to kick out all members with lower roles. Make sure you set this up correctly on your discord server

- ### Moderation logs
Cooming soon

---

### Auto moderation
Discord currently offers several self-moderation features. It is necessary to investigate which auto-moderation options would not be included in this integration to develop an automatic moderator that offers advantages over Discord's native features. In the meantime, you can access auto-moderation on your server by going to: Server Settings -> Automod.