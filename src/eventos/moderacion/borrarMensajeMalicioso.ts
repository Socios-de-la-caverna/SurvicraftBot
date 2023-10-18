import { Message } from "discord.js";
import SimpleCord from "../../lib/SimpleCord";

require("dotenv").config();
const rolStaff = process.env.ROL_STAFF as string;

export default function borrarMensajeMalicioso(
  message: Message,
  simpleCord: SimpleCord
) {
  const autor = message.guild?.members.cache.get(message.author.id);
  if (
    autor?.roles.cache.has(rolStaff) &&
    autor?.permissions.has("Administrator")
  )
    return;

  const contenidoProhibido = [
    "https://discord.gg/",
    "https://www.youtube.com/@",
    "https://youtube.com/@",
    "https://www.twitch.tv/",
    "https://twitch.tv/",
  ];

  const embed = simpleCord
    .crearEmbed()
    .setTitle("Mensaje eliminado")
    .setDescription(
      `El mensaje de ${message.author.username} fue eliminado por contener contenido prohibido`
    )
    .addFields([
      {
        name: "Contenido",
        value: message.content,
      },
      {
        name: "Canal",
        value: `<#${message.channel.id}>`,
      },
      {
        name: "Servidor",
        value: `${message.guild?.name}`,
      },
    ]);

  contenidoProhibido.forEach((contenido) => {
    if (!message.content.includes(contenido)) return;
    message.delete();
    message.author.send({ embeds: [embed] });
  });
}
