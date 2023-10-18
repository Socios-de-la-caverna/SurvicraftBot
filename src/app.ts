import { Client, GatewayIntentBits } from "discord.js";
import bienvenida from "./eventos/bienvenida";
import SimpleCord from "./lib/SimpleCord";
import panelTickets from "./comandos/panelTickets";
import expulsar from "./comandos/expulsar";
import banear from "./comandos/banear";
import crearTicket from "./eventos/crearTicket";
import cerrarTicket from "./eventos/cerrarTicket";
import reabrirTicket from "./eventos/reabrirTicket";
import eliminarTicket from "./eventos/eliminarTicket";
import transcribirTicket from "./eventos/transcribirTicket";

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
  .setColor("#04b504")
  .setImagen(
    "https://cdn.discordapp.com/attachments/1163349514619461714/1163596619254599680/Proyecto_nuevo.png"
  );

client.on("guildMemberAdd", (member) => {
  bienvenida(member, simpleCord);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isCommand()) {
    panelTickets(interaction, simpleCord);
    expulsar(interaction, simpleCord);
    banear(interaction, simpleCord);
  }
  if (interaction.isStringSelectMenu()) {
    crearTicket(interaction, simpleCord);
  }
  if (interaction.isButton()) {
    reabrirTicket(interaction);
    eliminarTicket(interaction, simpleCord);
    transcribirTicket(interaction, simpleCord);
  }
  cerrarTicket(interaction, simpleCord);
});
