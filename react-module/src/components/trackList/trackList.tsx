import { Pagination } from "./components/pagination";
import { useEffect, useState } from "react";
import { ListHeader } from "./components/listHeader";
import { SortModel, SortParams, TrackModel } from "models";
import { TracksService } from "services/trackService";
import loaderImage from '../../images/loader.gif';
import { ListItem } from "./components/listItem";
import { ModalWindow } from "./components/modalWindow";

import styles from "./trackList.module.css"

export const TrackList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorts, setSorts] = useState<SortModel[]>([]);
  const [tracks, setTracks] = useState<TrackModel[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(1);
  const [modalTrack, setModalTrack] = useState<TrackModel | undefined>();

  useEffect(() => {
    const params: SortParams = {
      page: page,
      pageSize: pageSize,
      sorts: sorts
    };

    const loadTracks = async () => {
      setLoader(true);

      const result = await TracksService.getListByPage(params);

      if (result.ok) {
        setTracks(result.data?.data as TrackModel[]);
        setTotal(result.data?.total as number);
        setSuccess(true);
        setCounter((page - 1) * 10 + 1);
      } else
        setSuccess(false);

      setLoader(false);
    }

    loadTracks();
    setFirstLoad(false);
  }, [page, pageSize, sorts]);

  useEffect(() => {
    setPage(1);
  }, [pageSize, sorts])

  return (
    <>
      <div className="main">
        {!success && !loader && <span className={styles["track-list-warning"]}>
          Sorry, something gone wrong. Please, note administrators about this.</span>}
        {!firstLoad && success && <ListHeader
          sorts={sorts}
          setSorts={setSorts} />}
        {loader && <img
          src={loaderImage}
          alt="loader"
          className={styles["track-list-loader"]} />}
        {!firstLoad && success && !loader && <div className={styles["track-list"]}>
          {
            tracks.map((t, index) => <ListItem
              counter={counter + index}
              track={t}
              onReportClick={() => setModalTrack(t)}
              key={counter + index} />)
          }
        </div>}
        {!firstLoad && success && <Pagination
          totalCount={total}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={(page: number) => setPage(page)}
          onPageSizeChange={(pageSize: number) => setPageSize(pageSize)} />}
        {modalTrack && <ModalWindow
          track={modalTrack}
          onCloseClick={() => setModalTrack(undefined)} />}
      </div>
    </>
  );
};