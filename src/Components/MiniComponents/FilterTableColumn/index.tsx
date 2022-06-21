import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { FormCheck } from "react-bootstrap";
import styles from "./index.module.css";
import { IFilterTableColumnItem } from "./types";

interface FilterTableColumnProps {
  items: IFilterTableColumnItem[];
  setData: Dispatch<SetStateAction<string[]>>;
  filter: string[];
  keyFilter: string;
}

export default function FilterTableColumn({
  items,
  setData,
  filter,
  keyFilter,
}: FilterTableColumnProps) {
  const onChecked = (checked: boolean, filterItem: string) => {
    let newFilter = [];
    if (checked) {
      newFilter = filter.filter((item) => item !== filterItem);
    } else {
      newFilter = [...filter, filterItem];
    }
    setData(newFilter);
    localStorage.setItem(keyFilter, JSON.stringify(newFilter));
  };

  return (
    <div className={styles["hover"]}>
      FILTER
      <div className={styles["blockBottom"]}>
        {items.map((item, index) => (
          <div
            className={styles["checkBoxItem"]}
            key={index + "filterC" + keyFilter}
          >
            <FormCheck
              label={item.title}
              checked={!filter.includes(item.id)}
              className={classNames("checkbox")}
              onChange={(e) => {
                onChecked(e.target.checked, item.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
