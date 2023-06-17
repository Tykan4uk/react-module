export type ResponseStatus<T> = {
  ok: boolean;
  data?: T;
}