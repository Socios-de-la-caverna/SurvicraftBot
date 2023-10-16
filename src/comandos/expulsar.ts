import { CommandInteraction, codeBlock } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

export default async function expulsar(
  interaction: CommandInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.commandName !== "expulsar") return;

  const autor = await interaction.guild?.members.fetch(interaction.user.id);
  if (!autor?.permissions.has("KickMembers")) {
    return interaction.reply({
      content: "No tienes permiso para ejecutar este comando",
      ephemeral: true,
    });
  }

  const sancionadoId = interaction.options.get("usuario")?.value;
  const sancionado = await interaction.guild?.members.fetch(
    sancionadoId as string
  );

  if (!sancionado) {
    return interaction.reply({
      content: "No se ha encontrado al usuario",
      ephemeral: true,
    });
  }

  if (sancionado.roles.highest > autor.roles.highest) {
    return interaction.reply({
      content: "No puedes sancionar a alguien con un rol mayor al tuyo",
      ephemeral: true,
    });
  }

  const razon = interaction.options.get("razon")?.value;

  const embedServidor = simpleCord
    .crearEmbed()
    .setAuthor({
      name: `${sancionado.user.username} ha sido expulsado`,
      iconURL: sancionado.user.avatarURL() as string,
    })
    .setDescription(codeBlock("ansi", `Razón de la expulsión:\n${razon}`));

  const embedDm = simpleCord
    .crearEmbed()
    .setAuthor({
      name: `Has sido expulsado de ${interaction.guild?.name}`,
      iconURL: interaction.guild?.iconURL() as string,
    })
    .setDescription(codeBlock("ansi", `Razón de la expulsión:\n${razon}`));

  await interaction.reply({
    embeds: [embedServidor],
  });

  await sancionado.send({ embeds: [embedDm] });

  await sancionado.kick();
}
