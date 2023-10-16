import { Client, GatewayIntentBits } from "discord.js";
import bienvenida from "./eventos/bienvenida";

require("dotenv").config();
const { TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(TOKEN);

client.on("ready", () => {
  console.log(`El bot ${client.user?.username} está en linea`);
});

client.on("guildMemberAdd", (member) => {
  bienvenida(member);
});
