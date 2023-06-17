import { AuthUserModel } from "models"
import { IAction } from "../types"

export const UPDATE_AUTH_USER = "UPDATE_AUTH_USER";
export const REMOVE_AUTH_USER = "REMOVE_AUTH_USER";
export const GET_AUTH_USER = "GET_AUTH_USER";

export type TUpdateAuthUserAction = IAction<AuthUserModel>;

export const updateAuthUser = (user: AuthUserModel | null): TUpdateAuthUserAction => {
  return { type: UPDATE_AUTH_USER, payload: user };
};

export const removeAuthUser = () => {
  return { type: REMOVE_AUTH_USER };
};

export const getAuthUser = () => {
  return { type: GET_AUTH_USER };
};