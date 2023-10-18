import {
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  Interaction,
  Role,
  TextChannel,
} from "discord.js";
import SimpleCord from "../lib/SimpleCord";

require("dotenv").config();

export default async function cerrarTicket(
  interaction: Interaction,
  simpleCord: SimpleCord
) {
  if (!interaction.isCommand() && !interaction.isButton()) return;

  if (interaction.isButton()) {
    if (interaction.customId !== "cerrar-ticket") return;
    interaction.message.delete();
  }

  const canalTicket = interaction.guild?.channels.cache.get(
    interaction.channelId as string
  ) as TextChannel;
  const categoriaTickets = process.env.CATEGORIA_TICKETS as string;
  const rolStaff = process.env.ROL_STAFF as string;

  if (interaction.isCommand()) {
    if (interaction.commandName !== "cerrar-ticket") return;

    const autor = await interaction.guild?.members.fetch(interaction.user.id);
    if (
      !autor?.roles.cache.has(rolStaff) &&
      !autor?.permissions.has("Administrator")
    ) {
      return interaction.reply({
        content: "No tienes permiso para ejecutar este comando",
        ephemeral: true,
      });
    }
    if (canalTicket?.parentId !== categoriaTickets) {
      return interaction.reply({
        content: "Este canal no es un ticket",
        ephemeral: true,
      });
    }
    interaction.reply({
      content: "Se ha cerrado el ticket",
      ephemeral: true,
    });
  }

  const rolEveryone = interaction.guild?.roles.everyone as Role;

  canalTicket.permissionOverwrites.edit(rolEveryone, {
    SendMessages: false,
  });

  const embed = simpleCord
    .crearEmbed()
    .setTitle("🔒 Ticket cerrado")
    .setDescription(
      "Este ticket se ha cerrado. Un miembro del staff lo revisará en breve."
    );

  const botones = simpleCord.crearBoton([
    {
      etiqueta: "Reabrir",
      emoji: "🔓",
      idPersonalizado: "reabrir-ticket",
      estilo: ButtonStyle.Success,
    },
    {
      etiqueta: "Transcribir",
      emoji: "📝",
      idPersonalizado: "transcribir-ticket",
      estilo: ButtonStyle.Primary,
    },
    {
      etiqueta: "Eliminar",
      emoji: "🗑️",
      idPersonalizado: "eliminar-ticket",
      estilo: ButtonStyle.Danger,
    },
  ]);

  canalTicket.send({
    embeds: [embed],
    components: [botones],
  });
}
