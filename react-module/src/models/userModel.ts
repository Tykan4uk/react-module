import { RoleModel } from "./roleModel"

export type UserModel = {
  id: number,
  email: string,
  role: RoleModel
}