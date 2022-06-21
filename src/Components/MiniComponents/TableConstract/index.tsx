import React, { useMemo } from "react";

import stable from "Styles/table.module.css";
import { headersOptimization } from "./helpers";
import ThElem from "./ThElem";
import TrElem from "./TrElem";
import { ITableConstract } from "./types";

export default function TableConstract({ header, content }: ITableConstract) {
  const headerConstract = useMemo(() => {
    return headersOptimization(header);
  }, [header]);

  const allColTable = useMemo(() => {
    let allCol = 0;
    headerConstract?.[0]?.forEach((headItem) => {
      allCol = allCol + (headItem.col || 1);
    });

    return allCol;
  }, [headerConstract]);

  return (
    <table className={stable["table"]}>
      <thead className={stable["headerTable"]}>
        {headerConstract.map((tr, indexTr) => (
          <tr key={"headerTr" + indexTr}>
            {tr.map((th, indexTh) => (
              <ThElem
                {...th}
                key={indexTr + "headerTh" + indexTh}
                row={th.row || header.length - indexTr}
              />
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {content?.map((contentItem, index) => {
          return (
            <TrElem
              allCol={allColTable}
              tdItems={contentItem}
              key={"tr" + index}
              
            />
          );
        })}
      </tbody>
    </table>
  );
}
