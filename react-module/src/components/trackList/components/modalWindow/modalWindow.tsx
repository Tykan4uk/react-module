import { useDispatch } from "react-redux";
import { getAuthUser, useAuthUserSelector } from "store";
import { useEffect, useState } from "react";
import { TrackModel, ReportReasonModel, TrackReportModel } from "models";

import styles from "./modalWindow.module.css"
import { DropDownService } from "services/dropDownService";
import { TracksService } from "services/trackService";

export interface ModalWindowProps {
  track: TrackModel,
  onCloseClick: () => void
}

export const ModalWindow = ({ track, onCloseClick }: ModalWindowProps) => {
  const dispatch = useDispatch();
  const authUser = useAuthUserSelector();
  const [reasons, setReasons] = useState<ReportReasonModel[]>([]);
  const [selectedReason, setSelectedReason] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAuthUser());

    const getReasons = async () => {
      if (authUser.user) {
        const result = await DropDownService.getReportReasons();

        setReasons(result as ReportReasonModel[]);
      }
    }

    getReasons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onReportClick = async () => {
    const report: TrackReportModel = {
      trackId: track.id,
      reasonId: selectedReason
    }

    const result = await TracksService.reportTrack(report);

    if (result.ok) {
      track.inReview = true;
      onCloseClick();
    } else
      setError(true);
  }

  return (
    <>
      <div className={styles["modal-background"]}>
        <div className={styles[authUser.user && !error ? "modal-window" : "modal-window-warning"]}>
          <button
            className={styles["modal-close"]}
            onClick={onCloseClick}>x</button>
          {authUser.user
            ? (!error ? <div className={styles["modal-content"]}>
              <span className={styles["modal-text"]}>
                Select the reason for the report:</span>
              <select
                className={styles["modal-dropdown"]}
                onChange={(e) => setSelectedReason(+e.target.value)}>
                {
                  reasons.map((r, index) => <option
                    value={r.id}
                    key={index}>{r.reason}</option>)
                }
              </select>
              <button
                className={styles["modal-button"]}
                onClick={onReportClick}>Send report</button>
            </div>
              : <span className={styles["auth-warning"]}>
                Some problem with server. Try later again.
              </span>)
            : <span className={styles["auth-warning"]}>
              You must be logged in to submit your report.
            </span>}
        </div>
      </div>
    </>
  )
}
