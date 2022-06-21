import React from "react";
import { useParams } from "react-router-dom";
import { InvoicePages } from "../Constants";

import styles from "./BillingAffiliatesInvoiceEditOfferDetails.module.css";
import stylesTable from "Styles/table.module.css";
import classNames from "classnames";
import { NavigationTabs, Icon } from "Components/MiniComponents";

const tabledata = [
  {
    title: "Million CPA RU",
    count: "9",
    price: "30 USD",
    totalUSD: "30 USD",
    totalRUB: "-",
    totalEUR: "-",
  },
  {
    title: "WildTornado CPA 5 countries",
    count: "22",
    price: "150 USD",
    totalUSD: "150 USD",
    totalRUB: "-",
    totalEUR: "-",
  },
  {
    title: "Total",
    count: "1023",
    price: "",
    totalUSD: "195 USD",
    totalRUB: "2000 RUB",
    totalEUR: "30 EUR",
  },
];

export default function BillingAffiliatesInvoiceEditOfferDetails() {
  const params = useParams<{ id: string }>();

  return (
    <div className={"wrapper"}>
      {params ? (
        <div>
          <h1 className={styles["title"]}>Invoice #{params.id}</h1>
          <NavigationTabs items={InvoicePages(params.id)} />
          <table className={styles["table"]}>
            <thead className={stylesTable.headerTable}>
              <tr>
                <th>Title</th>
                <th className={styles["center"]}>Count</th>
                <th className={styles["center"]}>Price</th>
                <th className={styles["center"]}>Total USD</th>
                <th className={styles["center"]}>Total RUB</th>
                <th className={styles["center"]}>Total EUR</th>
              </tr>
            </thead>
            <tbody>
              {tabledata?.map((item, index) => {
                if (tabledata.length - 1 === index) {
                  return (
                    <tr
                      key={"tableInv" + index}
                      className={classNames(
                        stylesTable.trTable,
                        styles["total"]
                      )}
                    >
                      <td>{item.title}</td>
                      <td className={styles["center"]}>{item.count}</td>
                      <td className={styles["center"]}>{item.price}</td>
                      <td className={styles["center"]}>{item.totalUSD}</td>
                      <td className={styles["center"]}>{item.totalRUB}</td>
                      <td className={styles["center"]}>{item.totalEUR}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={"tableInv" + index} className={stylesTable.trTable}>
                    <td>{item.title}</td>
                    <td
                      className={classNames(
                        styles["center"],
                        styles["iconRow"]
                      )}
                    >
                      <div>{item.count} </div>
                      <Icon icon={"graph"} className={styles["icon"]} />
                    </td>
                    <td className={styles["center"]}>{item.price}</td>
                    <td className={styles["center"]}>{item.totalUSD}</td>
                    <td className={styles["center"]}>{item.totalRUB}</td>
                    <td className={styles["center"]}>{item.totalEUR}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
