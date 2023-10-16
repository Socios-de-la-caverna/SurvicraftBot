import { ButtonStyle, CommandInteraction } from "discord.js";
import SimpleCord from "../lib/SimpleCord";

export default async function panelTickets(
  interaction: CommandInteraction,
  simpleCord: SimpleCord
) {
  if (interaction.commandName !== "panel") return;
  if (interaction.options.get("tipo")?.value !== "tickets") return;

  const embedPanelTickets = simpleCord
    .crearEmbed()
    .setTitle("Tickets / Soporte")
    .setThumbnail((await interaction.guild?.iconURL()) as string)
    .setDescription(
      "Buenas Tardes, Días o Noches aquí podrás pedir ayuda de todo tipo ya sea bugs, reporte, sugerencia, etc . No dudes en acudir aquí que te ayudaremos lo mas rápido y amable posible . Recuerda ser totalmente honesto si el staff te pregunta algo, nosotros comprobaremos tu respuesta luego y si la consideramos fraudulenta eliminaremos tu Ticket o rechazaremos tu solicitud. Gracias"
    )
    .setFooter({
      text: "Recuerda que intentaremos ayudarte en todo momento",
    });

  const seleccionPanelTickets = simpleCord.crearListaDeSeleccion({
    idPersonalizado: "panel-tickets",
    espacioReservado: "Selecciona un departamento",
    opciones: [
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
        descripcion: "cambiar",
        valor: "requi-media",
        emoji: "🎥",
      },
      {
        etiqueta: "Padres de familia",
        descripcion: "cambiar",
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
