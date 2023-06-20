import { UserModel } from "./userModel"

export type AuthUserModel = {
  user: UserModel,
  accessToken: string
}