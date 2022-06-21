import { IHeaderItem } from "../types";
import styles from "./index.module.css";

interface ThElemProps extends IHeaderItem {
  onClick?: any;
}

export default function ThElem({
  onClick,
  col,
  title,
  type,
  row,
}: ThElemProps) {
  if (!type) {
    return (
      <th colSpan={col} rowSpan={row} className={styles["title"]}>
        {title}
      </th>
    );
  }

  switch (type) {
    case "title":
      return (
        <th colSpan={col} rowSpan={row} className={styles["title"]}>
          {title}
        </th>
      );

    case "sort":
      return (
        <th
          colSpan={col}
          rowSpan={row}
          onClick={onClick}
          className={styles["sort"]}
        >
          {title} Sort
        </th>
      );

    default:
      return (
        <th colSpan={col} rowSpan={row} className={styles["minititle"]}>
          {title}
        </th>
      );
  }
}
