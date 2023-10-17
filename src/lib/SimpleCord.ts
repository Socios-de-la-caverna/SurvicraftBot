import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ColorResolvable,
  ComponentEmojiResolvable,
  EmbedBuilder,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";

type DetallesBoton = {
  estilo?: ButtonStyle;
  etiqueta?: string;
  emoji?: ComponentEmojiResolvable;
  desactivado?: boolean;
  idPersonalizado: string;
  url?: string;
};

type DetallesListaDeSeleccion = {
  idPersonalizado: string;
  espacioReservado: string;
  opciones: DetallesListaOpcion[];
};

type DetallesListaOpcion = {
  etiqueta: string;
  descripcion: string;
  valor: string;
  emoji?: ComponentEmojiResolvable;
  porDefecto?: boolean;
};

export default class SimpleCord {
  private color: ColorResolvable;
  private imagen: string;

  public setColor(color: ColorResolvable) {
    this.color = color;
    return this;
  }

  public setImagen(imagen: string) {
    this.imagen = imagen;
    return this;
  }

  public crearEmbed() {
    const embed = new EmbedBuilder();
    if (this.color) embed.setColor(this.color);
    if (this.imagen) embed.setImage(this.imagen);
    return embed;
  }

  public crearBoton(detallesBotones: DetallesBoton[]) {
    const botonesLista: ButtonBuilder[] = [];
    detallesBotones.forEach((boton) => {
      const botonNuevo = new ButtonBuilder();
      if (boton.estilo) botonNuevo.setStyle(boton.estilo);
      if (boton.etiqueta) botonNuevo.setLabel(boton.etiqueta);
      if (boton.emoji) botonNuevo.setEmoji(boton.emoji);
      if (boton.desactivado) botonNuevo.setDisabled(boton.desactivado);
      if (boton.idPersonalizado) botonNuevo.setCustomId(boton.idPersonalizado);
      if (boton.url) botonNuevo.setURL(boton.url);

      botonesLista.push(botonNuevo);
    });

    const componentes = new ActionRowBuilder<ButtonBuilder>().addComponents(
      botonesLista
    );

    return componentes;
  }

  public crearListaDeSeleccion(
    detallesListaDeSeleccion: DetallesListaDeSeleccion
  ) {
    const listaDeSeleccion = new StringSelectMenuBuilder()
      .setCustomId(detallesListaDeSeleccion.idPersonalizado)
      .setPlaceholder(detallesListaDeSeleccion.espacioReservado);

    detallesListaDeSeleccion.opciones.forEach((opcion) => {
      const opcionNueva = new StringSelectMenuOptionBuilder()
        .setLabel(opcion.etiqueta)
        .setDescription(opcion.descripcion)
        .setValue(opcion.valor);

      if (opcion.emoji) opcionNueva.setEmoji(opcion.emoji);
      if (opcion.porDefecto) opcionNueva.setDefault(opcion.porDefecto);

      listaDeSeleccion.addOptions(opcionNueva);
    });

    const componentes =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        listaDeSeleccion
      );

    return componentes;
  }

  public async crearTicket(
    interaction: StringSelectMenuInteraction,
    categoriaTickets: string,
    canalTicketPrefijo: string,
    rolesPermitidos: string
  ) {
    const canalTicket = await interaction.guild?.channels.create({
      name: `${canalTicketPrefijo}-${interaction.user.username}`,
      parent: categoriaTickets,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: rolesPermitidos,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
          ],
        },
      ],
    });

    return canalTicket;
  }
}
