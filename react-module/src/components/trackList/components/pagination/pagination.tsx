import { usePagination } from './hooks/paginationHook';
import { DOTS } from 'consts';

import styles from './pagination.module.css'
import { ChangeEvent } from 'react';

export interface PaginationProps {
  onPageChange: (page: number) => void,
  onPageSizeChange: (pageSize: number) => void,
  totalCount: number,
  currentPage: number,
  pageSize: number
}

export const Pagination = ({
  onPageChange,
  onPageSizeChange,
  totalCount,
  currentPage,
  pageSize
}: PaginationProps) => {
  let keyValue = 0;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    currentPage
  }) as (number | string)[];

  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(+e.target.value);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={styles['pagination']}>
      <div className={styles['pagination-container']}>
        <span className={styles["pagination-page"]}>Page</span>
        <span
          className={styles[currentPage !== 1 ? `pagination-item-prev` : "pagination-item-prev-disabled"]}
          onClick={onPrevious}
          key={keyValue}
        >
          &#8249;
        </span>
        {paginationRange.map(pageNumber => {
          keyValue = keyValue + 1;

          if (pageNumber === DOTS) {
            return <span
              className={styles["pagination-item-dotes"]}
              key={keyValue}>&#8230;</span>;
          }

          return (
            <span
              className={styles[pageNumber === currentPage ? 'pagination-item-active' : 'pagination-item']}
              onClick={() => onPageChange(pageNumber as number)}
              key={keyValue}
            >
              {pageNumber}
            </span>
          );
        })}
        <span
          className={styles[currentPage !== lastPage ? `pagination-item-next` : "pagination-item-next-disabled"]}
          onClick={onNext}
          key={keyValue}
        >
          &#8250;
        </span>
      </div>
      <div className={styles["pagination-page-sizes"]}>
        <span className={styles["pagination-per-page"]}>Per page</span>
        <select
          className={styles["page-size-dropdown"]}
          onChange={onSelectChange}
          defaultValue={pageSize}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

    </div>
  );
};