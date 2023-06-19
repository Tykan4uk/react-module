import { API_URL } from "consts";
import {
  PaginationModel,
  ResponseStatus,
  SortParams,
  TrackModel,
  TrackReportModel
} from "models";
import { IStore } from "store/types";

const userData: IStore = localStorage.getItem('persistantState')
  && JSON.parse(localStorage.getItem('persistantState') ?? '');

export class TracksService {
  static getListByPage = async (sortParams: SortParams):
    Promise<ResponseStatus<PaginationModel<TrackModel>>> => {
    const url = new URL(`${API_URL}/Track/GetByPage`);
    url.searchParams.set('page', sortParams.page.toString());
    url.searchParams.set('pageSize', sortParams.pageSize.toString());
    sortParams.sorts.forEach(sort => url.searchParams.set(`sorts[${sort.columnName}]`, sort.sortOrder));

    const headers: HeadersInit | undefined = userData
      ? { Authorization: `Bearer ${userData.authUser.accessToken}` }
      : undefined;

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    }).catch(() => { console.log('bad fetch') });

    const status: ResponseStatus<PaginationModel<TrackModel>> =
      { ok: response?.ok ?? false, data: await response?.json() };

    return status;
  }

  static reportTrack = async (trackReport: TrackReportModel):
    Promise<ResponseStatus<null>> => {
    const url = new URL(`${API_URL}/track/reportTrack`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.authUser.accessToken}`
      },
      body: JSON.stringify(trackReport)
    }).catch(() => { console.log('badFetch') });

    const status: ResponseStatus<null> =
      { ok: response?.ok ?? false };

    return status;
  }
}