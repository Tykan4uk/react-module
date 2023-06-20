import { useSelector } from "react-redux";
import { IStore } from "../types";

export const useAuthUserSelector = () => {
  return useSelector((state: IStore) => state.authUser);
};