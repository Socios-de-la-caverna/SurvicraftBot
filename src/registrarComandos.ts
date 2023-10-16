import { ApplicationCommandOptionType, REST, Routes } from "discord.js";

require("dotenv").config();
const { CLIENT_ID: clientId, TOKEN: token, GUILD_ID: guildId } = process.env;

const comandos = [
  {
    name: "panel",
    description: "Crea un panel de control",
    options: [
      {
        name: "tipo",
        description: "Nombre del panel que desea crear",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
];

(async () => {
  try {
    const rest = new REST({ version: "10" }).setToken(token as string);
    await rest.put(
      Routes.applicationGuildCommands(clientId as string, guildId as string),
      {
        body: comandos,
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
