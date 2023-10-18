import { ButtonInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

require("dotenv").config();
const rolStaff = process.env.ROL_STAFF as string;

export default async function eliminarTicket(
  interaction: ButtonInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.customId !== "eliminar-ticket") return;
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

  const embed = simpleCord
    .crearEmbed()
    .setTitle("El ticket se eliminará en 5 segundos");

  await interaction.reply({ embeds: [embed] });

  setTimeout(() => {
    interaction.channel?.delete();
  }, 5000);
}
