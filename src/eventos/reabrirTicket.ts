import { ButtonInteraction, Role, TextChannel } from "discord.js";

const rolStaff = process.env.ROL_STAFF as string;

export default function reabrirTicket(interaction: ButtonInteraction) {
  if (interaction.customId !== "reabrir-ticket") return;

  const autor = interaction.guild?.members.cache.get(interaction.user.id);
  if (
    !autor?.roles.cache.has(rolStaff) &&
    !autor?.permissions.has("Administrator")
  ) {
    return interaction.reply({
      content: "No tienes permiso para ejecutar este comando",
      ephemeral: true,
    });
  }

  const canalTicket = interaction.channel as TextChannel;
  const rolEveryone = interaction.guild?.roles.everyone as Role;

  canalTicket.permissionOverwrites.edit(rolEveryone, {
    SendMessages: true,
  });

  interaction.reply({
    content: "Se ha reabierto el ticket",
    ephemeral: true,
  });
  interaction.message.delete();
}
