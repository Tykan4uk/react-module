import styles from "./headerSortableItem.module.css"

export interface HeaderSortableItemProps {
  name: string,
  sortDirection: "ASC" | "DESC" | undefined,
  onClickSort: () => void
}

export const HeaderSortableItem = ({
  name,
  sortDirection,
  onClickSort }: HeaderSortableItemProps) => {
  return (
    <>
      <span
        className={styles["list-header-item"]}
        onClick={onClickSort}
      >{name}</span>
      {
        (sortDirection === "ASC" || sortDirection === "DESC")
        && <span
          className={styles["sort-arrow"]}
          onClick={onClickSort}>{sortDirection === "ASC" ? "⮟" : "⮝"}</span>
      }
      {
        sortDirection === undefined
        && <span
          className={styles["sort-arrow-placeholder"]}
          onClick={onClickSort}></span>
      }
    </>
  )
} 