import { GuildMember } from "discord.js";

require("dotenv").config();
const rolUsuario = process.env.ROL_USUARIO;

export default function autoRol(member: GuildMember) {
  if (!rolUsuario) return console.log("No se encontró el rol de usuario");
  member.roles.add(rolUsuario);
}
