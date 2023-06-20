import { SortModel } from "models";
import styles from "./listHeader.module.css"
import { HeaderSortableItem } from "./components/headerSortableItem";

export interface ListHeaderProps {
  sorts: SortModel[],
  setSorts: (sorts: SortModel[]) => void
}

export const ListHeader = ({ sorts, setSorts }: ListHeaderProps) => {

  const onClickSort = (name: string) => {
    const sortIndex = sorts.findIndex(s => s.columnName === name);

    if (sortIndex === -1)
      setSorts([...sorts, { columnName: name, sortOrder: "ASC" }]);
    else {
      if (sorts[sortIndex].sortOrder === "ASC") {
        const sortsCopy = [...sorts];
        sortsCopy[sortIndex].sortOrder = "DESC";
        setSorts(sortsCopy);
      } else
        setSorts(sorts.filter(s => s.columnName !== sorts[sortIndex].columnName));
    }
  }

  return (
    <>
      <div className={styles["list-header"]}>
        <HeaderSortableItem
          name="Author"
          sortDirection={sorts.find(s => s.columnName === "Author")?.sortOrder}
          onClickSort={() => onClickSort("Author")} />
        <HeaderSortableItem
          name="Title"
          sortDirection={sorts.find(s => s.columnName === "Title")?.sortOrder}
          onClickSort={() => onClickSort("Title")} />
        <HeaderSortableItem
          name="Genre"
          sortDirection={sorts.find(s => s.columnName === "Genre")?.sortOrder}
          onClickSort={() => onClickSort("Genre")} />
      </div>
    </>
  );
};