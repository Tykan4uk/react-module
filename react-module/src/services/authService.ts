import { API_URL } from "consts";
import { AuthRequest, AuthUserModel, ResponseStatus } from "models";

export class AuthService {
  static signin = async (user: AuthRequest): Promise<ResponseStatus<null>> => {
    const url = new URL(`${API_URL}/user/signin`);

    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).catch(() => { console.log('badFetch') });

    const status: ResponseStatus<null> = { ok: response?.ok ?? false };

    return status;
  }

  static login = async (user: AuthRequest): Promise<ResponseStatus<AuthUserModel>> => {
    const url = new URL(`${API_URL}/user/login`);

    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).catch(() => { console.log('badFetch') });

    const status: ResponseStatus<AuthUserModel> = { ok: response?.ok ?? false, data: await response?.json() };

    return status;
  }
}