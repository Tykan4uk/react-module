import { API_URL } from "consts";
import { ReportReasonModel } from "models";
import { IStore } from "store/types";

const userData: IStore = localStorage.getItem('persistantState')
  && JSON.parse(localStorage.getItem('persistantState') ?? '');

export class DropDownService {
  static reportReasons: ReportReasonModel[] | undefined;

  static getReportReasons = async (): Promise<ReportReasonModel[] | undefined> => {
    let result: ReportReasonModel[] | undefined;

    if (this.reportReasons === undefined) {
      const headers: HeadersInit | undefined = userData
        ? { Authorization: `Bearer ${userData.authUser.accessToken}` }
        : undefined;

      const response = await fetch(`${API_URL}/DropDown/GetReportReasons`, {
        method: "GET",
        headers: headers
      }).catch(() => { console.log("badFetch") });

      result = (response?.ok ?? false) ? await response?.json() : undefined;

      this.reportReasons = result;
    } else {
      result = this.reportReasons;
    }

    return result;
  }
}