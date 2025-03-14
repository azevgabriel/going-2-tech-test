import { UserModel } from "@/interfaces/User";

export const ROLES_PT_BR: Record<UserModel["role"], string> = {
  admin: "Administrador",
  manager: "Gerente",
  user: "Usuário",
};
