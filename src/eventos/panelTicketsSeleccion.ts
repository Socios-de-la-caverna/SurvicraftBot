import { StringSelectMenuInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

const categoriaTickets = "1163495635840929852";

export default async function panelTicketsSeleccion(
  interaction: StringSelectMenuInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.customId !== "panel-tickets") return;

  let canalTicketNombre = "";
  let tituloEmbed = "";
  let descripcionEmbed = "";

  switch (interaction.values[0]) {
    case "bug":
      canalTicketNombre = "🐛︙bug-";
      tituloEmbed = "Reporte de bug";
      descripcionEmbed =
        "Describe el bug que encontraste. Por favor, se lo más específico posible. Si es posible, incluye capturas de pantalla.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "reporte":
      canalTicketNombre = "👮︙reporte-";
      tituloEmbed = "Reporte de usuario";
      descripcionEmbed =
        "Describe el reporte que quieres hacer. Por favor, se lo más específico posible. Si es posible, incluye capturas de pantalla.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "sugerencias":
      canalTicketNombre = "📝︙sugerencias-";
      tituloEmbed = "Sugerencia";
      descripcionEmbed =
        "Describe la sugerencia que quieres hacer. Por favor, se lo más específico posible.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "requi-media":
      canalTicketNombre = "🎥︙requi-media-";
      tituloEmbed = "Requi Media";
      descripcionEmbed =
        "Describe la solicitud que quieres hacer.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "padres-familia":
      canalTicketNombre = "👪︙padres-familia-";
      tituloEmbed = "Padres de familia";
      descripcionEmbed =
        "Describe la solicitud que quieres hacer.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "compras-tienda":
      canalTicketNombre = "🛒︙compras-tienda-";
      tituloEmbed = "Compras en tienda";
      descripcionEmbed =
        "Describe la compra que quieres hacer.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    case "staff":
      canalTicketNombre = "👨‍🔧︙staff-";
      tituloEmbed = "Solicitud de staff";
      descripcionEmbed =
        "Describe la solicitud que quieres hacer.\nEn unos momentos serás atendido por un miembro del staff. ";
      break;
    default:
      break;
  }

  const canalTicket = await simpleCord.crearTicket(
    interaction,
    categoriaTickets,
    canalTicketNombre
  );

  const embedTicket = simpleCord
    .crearEmbed()
    .setTitle(tituloEmbed)
    .setDescription(descripcionEmbed);

  canalTicket?.send({
    content: `<@${interaction.user.id}>`,
    embeds: [embedTicket],
  });
}
