import { UserModel } from "models";

export interface IAction<T> {
  type: string;
  payload: T | null;
}

export interface IAuthUser {
  user: null | UserModel;
  accessToken: null | string;
}

export interface IStore {
  authUser: IAuthUser;
}