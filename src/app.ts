import { Client, GatewayIntentBits } from "discord.js";
import bienvenida from "./eventos/bienvenida";
import SimpleCord from "./lib/SimpleCord";
import panelTickets from "./comandos/panelTickets";

require("dotenv").config();
const { TOKEN: token } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(token);

client.on("ready", () => {
  console.log(`El bot ${client.user?.username} está en linea`);
});

const simpleCord = new SimpleCord()
  .setColor("#fb6567")
  .setImagen(
    "https://cdn.discordapp.com/attachments/1163349514619461714/1163489442623914115/Proyecto_nuevo.png"
  );

client.on("guildMemberAdd", (member) => {
  bienvenida(member, simpleCord);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;
  panelTickets(interaction, simpleCord);
});
