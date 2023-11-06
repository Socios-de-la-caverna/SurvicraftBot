import { ButtonStyle, CommandInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

export default async function panelTickets(
  interaction: CommandInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.commandName !== "panel") return;
  if (interaction.options.get("tipo")?.value !== "tickets") return;
  const autor = await interaction.guild?.members.fetch(interaction.user.id);
  if (!autor?.permissions.has("Administrator")) {
    return interaction.reply({
      content: "No tienes permiso para ejecutar este comando",
      ephemeral: true,
    });
  }

  const embedPanelTickets = simpleCord
    .crearEmbed()
    .setTitle("🖐 Soporte")
    .setThumbnail((await interaction.guild?.iconURL()) as string)
    .setDescription(
      `
    Bienvenido a Soporte de Survicraft
    
    **🛑 NOTA**

    Buenas tardes, días o noches. Aquí podrás pedir ayuda de todo tipo.

    **🌞 IMPORTANTE**

    Recuerda ser totalmente honesto si el staff te pregunta algo, nosotros comprobaremos tu respuesta, y si la consideramos fraudulenta eliminaremos tu ticket.
    `
    )
    .setFooter({
      text: "Recuerda que intentaremos ayudarte en todo momento",
    });

  const seleccionPanelTickets = simpleCord.crearListaDeSeleccion({
    idPersonalizado: "panel-tickets",
    espacioReservado: "Selecciona un departamento",
    opciones: [
      {
        etiqueta: "Alianza",
        descripcion: "Solicita una alianza entre servidores",
        valor: "alianza",
        emoji: "🤝"
      },
      {
        etiqueta: "Bug",
        descripcion: "Reporta un bug",
        valor: "bug",
        emoji: "🐛",
      },
      {
        etiqueta: "Reporte",
        descripcion: "Reporta a un usuario",
        valor: "reporte",
        emoji: "👮",
      },
      {
        etiqueta: "Sugerencias",
        descripcion: "Danos tus sugerencias",
        valor: "sugerencias",
        emoji: "📝",
      },
      {
        etiqueta: "Requi Media",
        descripcion: "Asóciate a nosotros mediante videos o streams",
        valor: "requi-media",
        emoji: "🎥",
      },
      {
        etiqueta: "Padres de familia",
        descripcion: "Pregunta por la actividad de tus hijos",
        valor: "padres-familia",
        emoji: "👪",
      },
      {
        etiqueta: "Compras en tienda",
        descripcion: "Compra algo en nuestra tienda",
        valor: "compras-tienda",
        emoji: "🛒",
      },
      {
        etiqueta: "Staff",
        descripcion: "Solicita ser staff del servidor",
        valor: "staff",
        emoji: "👨‍🔧",
      },
    ],
  });

  interaction.reply({
    embeds: [embedPanelTickets],
    components: [seleccionPanelTickets],
  });
}
