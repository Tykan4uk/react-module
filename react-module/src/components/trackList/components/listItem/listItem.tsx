import { TrackModel } from "models"

import styles from "./listItem.module.css"

export interface ListItemProps {
  counter: number,
  track: TrackModel,
  onReportClick: () => void
}

export const ListItem = ({ counter, track, onReportClick }: ListItemProps) => {
  return (
    <>
      <div className={styles["track-list-item"]}>
        <span className={styles["track-list-item-number"]}>{counter}.</span>
        <span className={styles["track-list-item-author"]}>{track.singer}</span>
        <span className={styles["track-list-item-title"]}>{track.title}</span>
        <span className={styles["track-list-item-genre"]}>{track.genre}</span>
        <div className={styles["track-list-item-play-button"]}>
          <span className={styles["track-list-item-play-button-play"]}>▶</span>
        </div>
        {track.inReview
          ? <div className={styles["track-list-item-review"]}>In review</div>
          : <div
            className={styles["track-list-item-check-button"]}
            onClick={onReportClick}>Need check</div>}
      </div>
    </>
  )
}