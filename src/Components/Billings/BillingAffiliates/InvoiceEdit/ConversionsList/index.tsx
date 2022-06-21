import React from "react";
import { useParams } from "react-router-dom";
import { InvoicePages } from "../Constants";

import styles from "./BillingAffiliatesInvoiceEditConversionList.module.css";
import stylesTable from "Styles/table.module.css";
import { NavigationTabs } from "Components/MiniComponents";

const tabledata = [
  {
    offer: "(00275) Million CPA RU",
    conversionID: "432854",
    date: "2019-08-23",
    payouts: "30 USD",
  },
  {
    offer: "(00276) WildTornado CPA 5 countries",
    conversionID: "582570",
    date: "2019-08-23",
    payouts: "150 USD",
  },
  {
    offer: "(00256) Mostbet Casino CPA Ru+CIS",
    conversionID: "354864",
    date: "2019-08-23",
    payouts: "800 RUB",
  },
  {
    offer: "(00168) Lord of the Spins Hybrid 5 countries",
    conversionID: "432854",
    date: "2019-08-23",
    payouts: "30 USD",
  },
  {
    offer: "(00275) Million CPA RU",
    conversionID: "432854",
    date: "2019-08-23",
    payouts: "30 USD",
  },
  {
    offer: "(00276) WildTornado CPA 5 countries",
    conversionID: "582570",
    date: "2019-08-23",
    payouts: "150 USD",
  },
  {
    offer: "(00256) Mostbet Casino CPA Ru+CIS",
    conversionID: "354864",
    date: "2019-08-23",
    payouts: "800 RUB",
  },
];

export default function BillingAffiliatesInvoiceEditConversionList() {
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
                <th>Offer</th>
                <th>Conversion ID</th>
                <th>Date</th>
                <th>Payouts</th>
              </tr>
            </thead>
            <tbody>
              {tabledata?.map((item, index) => {
                return (
                  <tr key={"tableInv" + index} className={stylesTable.trTable}>
                    <td>{item.offer}</td>
                    <td>{item.conversionID}</td>
                    <td>{item.date}</td>
                    <td>{item.payouts}</td>
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
