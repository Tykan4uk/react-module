import { IStore } from "../types";
import {
  GET_AUTH_USER,
  REMOVE_AUTH_USER,
  UPDATE_AUTH_USER,
  TUpdateAuthUserAction
} from "../actions/authUserActions"

const initialState: IStore["authUser"] = {
  user: null,
  accessToken: null
};

const updateAuthUser = (
  state: IStore["authUser"],
  action: TUpdateAuthUserAction
): IStore["authUser"] => ({
  ...state,
  user: action.payload?.user ?? null,
  accessToken: action.payload?.accessToken ?? null
});

const removeAuthUser = (
  state: IStore["authUser"]
): IStore["authUser"] => ({
  ...state,
  user: null,
  accessToken: null
});

const getAuthUser = (state: IStore["authUser"]): IStore["authUser"] => ({ ...state });

export const authUserReducer = (
  state: IStore["authUser"] = initialState,
  action: TUpdateAuthUserAction
) => {
  switch (action.type) {
    case UPDATE_AUTH_USER:
      return updateAuthUser(state, action);
    case REMOVE_AUTH_USER:
      return removeAuthUser(state);
    case GET_AUTH_USER:
      return getAuthUser(state);
    default:
      return state;
  }
};