import { API_URL } from "consts";
import {
  AuthUserModel,
  PaginationModel,
  ResponseStatus,
  SortParams,
  TrackModel
} from "models";
import { IStore } from "store/types";

const userData: IStore = JSON.parse(localStorage.getItem('persistantState') ?? '');

export class TracksService {


  static getListByPage = async (sortParams: SortParams):
    Promise<ResponseStatus<PaginationModel<TrackModel>>> => {
    const url = new URL(`${API_URL}/Track/GetByPage`);
    url.searchParams.set('page', sortParams.page.toString());
    url.searchParams.set('pageSize', sortParams.pageSize.toString());
    sortParams.sorts.forEach(sort => url.searchParams.set(`sorts[${sort.columnName}]`, sort.sortOrder));

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${userData.authUser.accessToken}` }
    }).catch(() => { console.log('bad fetch') });

    const status: ResponseStatus<PaginationModel<TrackModel>> =
      { ok: response?.ok ?? false, data: await response?.json() };

    return status;
  }
}