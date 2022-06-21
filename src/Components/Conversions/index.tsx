import { useEffect, useState, useMemo } from "react";

import { FilterTableColumn, SpinnerLogo } from "Components/MiniComponents";
import ConversionsItem from "./ConversionsItem";

import { IConversions } from "./types";

import { useAppDispatch, useAppSelector } from "Hooks";

import stylesPage from "./index.module.css";
import styles from "Styles/table.module.css";

export interface ITableColumn {
  id: keyof IConversions;
  title: string;
}

const tableColumn: ITableColumn[] = [
  { id: "id", title: "Id" },
  { id: "status", title: "Status" },
  { id: "click_id", title: "Click Id" },
  { id: "is_paid", title: "Is paid" },
  { id: "goal", title: "Goal" },
  { id: "action_id", title: "Action Id" },
  { id: "ip", title: "Ip" },
  { id: "user_agent", title: "User agent" },
  { id: "os", title: "Os" },
  { id: "device", title: "Device" },
  { id: "mobile_isp", title: "Mobile Isp" },
  { id: "referer", title: "Referer" },
  { id: "currency", title: "Currency" },
  { id: "payouts", title: "Payouts" },
  { id: "revenue", title: "Revenue" },
  { id: "af_price", title: "Af price" },
  { id: "approve_dt", title: "Approve dt" },
  { id: "offer", title: "Offer" },
  { id: "advert", title: "Advert" },
  { id: "affiliate", title: "Affiliate" },
];

export default function ConversionsTable() {
  const { fetchConversionsList } = useAppDispatch();

  const data = useAppSelector((state) => state.Conversions.list);

  const [filterTable, setFilterTable] = useState<string[]>([]);

  useEffect(() => {
    fetchConversionsList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TableColumnFilter = useMemo(() => {
    return tableColumn.filter((item) => !filterTable.includes(item.id));
  }, [filterTable]);

  useEffect(() => {
    const localStorageFilter = localStorage.getItem("conversions");
    if (localStorageFilter) {
      setFilterTable(JSON.parse(localStorageFilter));
    }
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FilterTableColumn
          filter={filterTable}
          setData={setFilterTable}
          items={tableColumn}
          keyFilter="conversions"
        />
      </div>
      {data ? (
        <div className={stylesPage["table"]}>
          <table className={styles["table"]}>
            <thead className={styles.headerTable}>
              <tr>
                {TableColumnFilter.map((headerItem) => (
                  <th>{headerItem.title}</th>
                ))}
                <th className={styles["actionsTwo"]}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <ConversionsItem
                  props={item}
                  key={index + "conv"}
                  TableColumnFilter={TableColumnFilter}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <SpinnerLogo />
      )}
    </div>
  );
}
