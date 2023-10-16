import { StringSelectMenuInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

const categoriaTickets = "1163495635840929852";

export default async function panelTicketsSeleccion(
  interaction: StringSelectMenuInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.customId !== "panel-tickets") return;

  if (interaction.values[0] == "bug") {
    const canalTicket = await simpleCord.crearTicket(
      interaction,
      categoriaTickets,
      "🐛-bug-"
    );

    const embedTicket = simpleCord
      .crearEmbed()
      .setTitle("Reporte de bug")
      .setDescription(
        "Describe el bug que encontraste. Por favor, se lo más específico posible. Si es posible, incluye capturas de pantalla.\nEn unos momentos serás atendido por un miembro del staff."
      );

    canalTicket?.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embedTicket],
    });
  }

  if (interaction.values[0] == "reporte") {
    const canalTicket = await simpleCord.crearTicket(
      interaction,
      categoriaTickets,
      "📝-reporte-"
    );

    const embedTicket = simpleCord
      .crearEmbed()
      .setTitle("Reporte de usuario")
      .setDescription(
        "Describe el comportamiento del usuario que deseas reportar. Por favor, se lo más específico posible. Si es posible, incluye capturas de pantalla.\nEn unos momentos serás atendido por un miembro del staff."
      );

    canalTicket?.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embedTicket],
    });
  }

  if (interaction.values[0] == "sugerencias") {
    const canalTicket = await simpleCord.crearTicket(
      interaction,
      categoriaTickets,
      "📣-sugerencia-"
    );

    const embedTicket = simpleCord
      .crearEmbed()
      .setTitle("Sugerencia")
      .setDescription(
        "Describe tu sugerencia. Por favor, se lo más específico posible.\nEn unos momentos serás atendido por un miembro del staff."
      );

    canalTicket?.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embedTicket],
    });
  }

  if (interaction.values[0] == "requi-media") {
    const canalTicket = await simpleCord.crearTicket(
      interaction,
      categoriaTickets,
      "🎨-requi-media-"
    );

    const embedTicket = simpleCord
      .crearEmbed()
      .setTitle("Requisición de medios")
      .setDescription(
        "Describe los medios que necesitas. Por favor, se lo más específico posible.\nEn unos momentos serás atendido por un miembro del staff."
      );

    canalTicket?.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embedTicket],
    });
  }

  if (interaction.values[0] == "padres-familia") {
    const canalTicket = await simpleCord.crearTicket(
      interaction,
      categoriaTickets,
      "👪-padres-familia-"
    );

    const embedTicket = simpleCord
      .crearEmbed()
      .setTitle("Padres de familia")
      .setDescription(
        "Describe tu situación. Por favor, se lo más específico posible.\nEn unos momentos serás atendido por un miembro del staff."
      );

    canalTicket?.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embedTicket],
    });
  }

  if (interaction.values[0] == "compras-tienda") {
    const canalTicket = await simpleCord.crearTicket(
      interaction,
      categoriaTickets,
      "🛒-compras-tienda-"
    );

    const embedTicket = simpleCord
      .crearEmbed()
      .setTitle("Compras en tienda")
      .setDescription(
        "Explicanos que deseas comprar. Por favor, se lo más específico posible.\nEn unos momentos serás atendido por un miembro del staff."
      );

    canalTicket?.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embedTicket],
    });
  }

  if (interaction.values[0] == "staff") {
    const canalTicket = await simpleCord.crearTicket(
      interaction,
      categoriaTickets,
      "👨‍🔧-staff-"
    );

    const embedTicket = simpleCord
      .crearEmbed()
      .setTitle("Solicitud de staff")
      .setDescription(
        "Describe tu solicitud. Por favor, se lo más específico posible.\nEn unos momentos serás atendido por un miembro del staff."
      );

    canalTicket?.send({
      content: `<@${interaction.user.id}>`,
      embeds: [embedTicket],
    });
  }
}
