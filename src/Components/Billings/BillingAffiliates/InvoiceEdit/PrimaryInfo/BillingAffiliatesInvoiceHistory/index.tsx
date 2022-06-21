import classNames from "classnames";
import React from "react";
import { Card } from "react-bootstrap";
import { IHistoryInvoice } from "../types";

import styles from "./BillingAffiliatesInvoiceHistory.module.css";

function CardHistory({
  date,
  correctionsValue,
  total,
  comment,
}: IHistoryInvoice) {
  return (
    <Card className={styles["cardHistory"]}>
      <div className={styles["cardDate"]}>{date}</div>
      <div className={styles["cardHistoryRow"]}>
        <div>
          Corrections Value: <span>{correctionsValue}</span>
        </div>
        <div>
          Total: <span>{total}</span>
        </div>
      </div>
      <div className={styles["cardComment"]}>
        Comment: <span>{comment}</span>
      </div>
    </Card>
  );
}

export default function BillingAffiliatesInvoiceHistory({
  history,
}: {
  history: IHistoryInvoice[];
}) {
  return (
    <div className={classNames("contnent-50p", styles["historyBlock"])}>
      <h2>Corrections history</h2>
      <div>
        {history?.map((item, index) => (
          <CardHistory key={"history" + index} {...item} />
        ))}
      </div>
    </div>
  );
}
