# Plantilla de bot de Discord (Typescript) 1.0

Plantilla de bot de Discord en TypeScript, con soporte para ejecutarse con o sin Docker. Esta es la versión en español de la documentación.

[Lee esto en inglés](README.md)

## Cómo empezar

### Configuración inicial e invitación del bot a tu servidor

1. Asegúrate de tener `nvm` instalado y ejecuta `nvm use`. `nvm` buscará el archivo `.nvmrc` para garantizar que uses la versión correcta del proyecto. Asegúrate de estar en la raíz del proyecto.

2. Copia el archivo `.env.dist` como `.env`, es allí donde se definirán tus variables de entorno. El archivo `.env` está incluido en el `.gitignore` y nunca se subirá al repositorio. Recuerda agregar las variables de entorno sin sus valores al archivo `.env.dist` para siempre tener un ejemplo en tu repositorio. Para hacerlo, puedes ejecutar el siguiente comando: `cp .env.dist .env`

3. Ve al portal de desarrolladores de Discord, crea una nueva aplicación y copia el token en tu archivo `.env` como valor de la variable `DISCORD_TOKEN`. [Portal de desarrolladores de Discord](https://discord.com/developers/applications).

4. Dentro del portal de desarrolladores de Discord, en la sección OAuth2, puedes generar un enlace para invitar al bot a tu servidor de Discord. En los alcances, selecciona "bot" y en los permisos selecciona "Administrador". Luego, copia la URL, pégala en tu navegador, selecciona tu servidor, ¡y listo!

### Sin Docker

Después de completar los pasos anteriores, ejecuta `npm run dev` para iniciar el bot en modo desarrollo. Asegúrate de que la variable de entorno `NODE_ENV` esté configurada en `development`. En este modo, el servidor detectará cualquier cambio en el código y reiniciará automáticamente el bot para aplicar los cambios.

Para iniciar el bot en modo producción sin Docker, asegúrate de que la variable de entorno `NODE_ENV` esté configurada en `production`. Luego, ejecuta `npm run build` y finalmente `npm run prod`, lo que ejecutará el código compilado. A diferencia del modo desarrollo, deberás crear una nueva build cada vez que realices cambios en el código.

### Con Docker

Este proyecto está configurado para funcionar con o sin Docker.  
Para iniciar el proyecto en modo desarrollo con Docker, ejecuta el comando `docker compose up`. Asegúrate de que la variable de entorno `NODE_ENV` esté configurada en `development` antes de ejecutar el comando.

Si deseas iniciar el proyecto en modo producción con Docker, modifica la variable de entorno `NODE_ENV` en tu archivo `.env` a `production` y ejecuta el comando `docker compose up`.

La diferencia es que, en modo desarrollo, el bot escuchará los cambios que hagas en el código cada vez que guardes, mientras que en modo producción debes compilar nuevamente el código después de cada cambio.

---

## Personalización de tu bot

Las opciones de personalización se irán añadiendo con el tiempo. Actualmente, tienes disponibles las siguientes opciones:

> [!NOTE]
> Algunas personalizaciones están cubiertas por Discord. En cada punto encontrarás un enlace a la documentación oficial con una lista de los valores de configuración soportados.

- ### Presencia

#### Estado

Puedes configurar la presencia de tu bot en el archivo `discord.settings.json`.  
En este archivo, encontrarás diferentes variables como `botStatus`, donde puedes configurar su valor como `online` o `AFK`, entre otros.

Puedes ver todos los valores soportados por Discord en este enlace: [Presencia](https://discord.js.org/docs/packages/discord.js/14.16.1/PresenceStatus:TypeAlias).

#### Actividades

Para modificar el estado de actividad del bot, ve al archivo `discord.settings.json`, donde puedes cambiar el nombre y tipo de actividad.  
Para el nombre, puedes establecer cualquier valor, pero para el tipo de actividad (`type`) debes ser estricto. Solo se pueden agregar ciertos valores como `Listening`, `Playing`, `Watching`, etc. Puedes ver la lista completa aquí: [Actividades](https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType).

- ### Activar o desactivar el seguimiento de usuarios

> [!WARNING]  
> Es posible que desees desactivar esta opción para mejorar el rendimiento de tu máquina o si no has avisado a tus usuarios que los datos que comparten están siendo recolectados.

Este seguimiento monitorea a los miembros de tu servidor cada 5 minutos. En el futuro, este tiempo será configurable.

Puedes habilitar o deshabilitar el seguimiento de usuarios agregando `false` o `true` a la variable de entorno `DISCORD_USER_TRACKING`, según tus necesidades. En el futuro, esto podría escribir datos relevantes sobre los miembros de tu servidor en una base de datos u otros proveedores.

Actualmente, solo escribirá en la consola una lista de usuarios que están conectados o desconectados. Puedes omitir este seguimiento estableciendo `false` como valor de la variable de entorno.

Para que esta funcionalidad funcione correctamente, debes ir al portal de desarrolladores de Discord y activar `intent de presencia` y `intent de miembros del servidor` en tu aplicación. [Portal de desarrolladores de Discord](https://discord.com/developers/applications).

- ### Añadir comandos

Iremos añadiendo diferentes comandos. Próximamente.

---

## Moderación

Este bot tiene comandos de moderación que pueden ser ejecutados por usuarios con roles de administrador o moderador.

Para habilitar estos roles, ve a tu servidor de Discord. En el caso de un rol de administrador, asegúrate de marcar la casilla de Administrador. Para los roles de moderador, asegúrate de que tengan permisos para expulsar, silenciar o banear a un usuario. De lo contrario, no podrán ejecutar dichos comandos debido a la falta de permisos.

Una vez que hayas creado los roles, copia sus identificadores y pégalos en el archivo `.env` como valores de las variables `DISCORD_ADMIN_ROLE_ID` y `DISCORD_MODERATOR_ROLE_ID`, respectivamente.

Reinicia el bot para aplicar los cambios.

> [!IMPORTANT]  
> Ten en cuenta que el bot solo podrá expulsar a miembros del servidor con roles inferiores al suyo. Un moderador no puede expulsar a otro moderador o administrador. Un administrador no puede expulsar a otros administradores, pero puede expulsar a otros moderadores. Ambos roles podrán expulsar a todos los miembros con roles inferiores. Asegúrate de configurar esto correctamente en tu servidor de Discord.

- ### Registros de moderación

Próximamente.

---

### Auto moderación

Actualmente, Discord ofrece varias funciones de auto moderación. Es necesario investigar qué opciones de auto moderación no están incluidas en esta integración para desarrollar un moderador automático que ofrezca ventajas sobre las funciones nativas de Discord. Mientras tanto, puedes acceder a la auto moderación en tu servidor yendo a: Configuración del servidor -> Automod.