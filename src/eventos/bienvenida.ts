import {
  EmbedBuilder,
  GuildMember,
  ColorResolvable,
  TextBasedChannel,
} from "discord.js";
import SimpleCord from "../lib/SimpleCord";

export default async function bienvenida(
  member: GuildMember,
  simpleCord: SimpleCord
) {
  const canalBienvenida = member.guild.channels.cache.get(
    "1163245148688351295"
  ) as TextBasedChannel;
  if (!canalBienvenida)
    return console.log("No se encontró el canal de bienvenidas");

  const embedBienvenida = simpleCord
    .crearEmbed()
    .setTitle(`Bienvenido ${member.user.username}! 🎉🎉`).setDescription(`
    Esperamos tengas una estadía agradable en SurviCraft recuerda visitar los siguientes canales y así conocer un poco mas de esta comunidad y sus costumbres.

  Reglas🪧: <#1154547672770957382>
  Anuncios 📢: <#1154935711028477962>
  About ✉️: <#1154557047862464542>

  Si quieres alguna duda puedes resolverla en la comunidad o creando un ticket, aquí también puedes hacer una sugerencia o ser Influencer <#1154560303758049332>

  Si quieres apoyarnos puedes invitar mas usuarios y así tener una comunidad mas desarrollada
  `);

  canalBienvenida.send({ embeds: [embedBienvenida] });
}
