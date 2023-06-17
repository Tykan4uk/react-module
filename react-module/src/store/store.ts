import { EmptyObject, combineReducers, createStore } from "redux";
import { authUserReducer } from "./reducers/authUserReducer";
import { IAuthUser } from "./types";

const rootReducer = combineReducers({
  authUser: authUserReducer
});

function saveToLocalStorage(state: EmptyObject & { authUser: IAuthUser; }) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export const store = createStore(
  rootReducer,
  loadFromLocalStorage()
);

store.subscribe(() => saveToLocalStorage(store.getState()));