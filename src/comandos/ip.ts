import { AttachmentBuilder, Message } from "discord.js";
import SimplecCord from "../lib/SimpleCord";
import axios from "axios";

require("dotenv").config();
const minecraftServidorIp = process.env.MINECRAFT_SERVIDOR_IP as string;

export default async function ip(message: Message, simpleCord: SimplecCord) {
  if (!message.content.includes("ip")) return;
  const servidorInfo = await axios
    .get(`https://api.mcsrvstat.us/3/${minecraftServidorIp}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const embed = simpleCord
    .crearEmbed()
    .setTitle(`La IP del servidor es ${minecraftServidorIp}`)
    .setDescription("Información del servidor")
    .addFields([
      {
        name: "Jugadores",
        value: `👥 ${servidorInfo.players.online}/${servidorInfo.players.max}`,
        inline: true,
      },
      {
        name: "Versión",
        value: `📦 ${servidorInfo.version}`,
        inline: true,
      },
      {
        name: "Estado",
        value: `🟢 ${servidorInfo.online ? "En linea" : "Apagado"}`,
        inline: true,
      },
    ]);

  message.reply({ embeds: [embed] });
}
