import React, { useState } from "react";

import classNames from "classnames";
import { useHistory } from "react-router";

import { FormCheck, Button } from "react-bootstrap";

import { URL_NEW_TICKETS } from "Constants/URLConstants/URLCabinet/URLTickets";

import styles from "Styles/table.module.css";

interface ITickets {
  id: string;
  status: string;
  date: string;
  affiliate: string;
  manager: string;
  type: string;
  title: string;
  lastDayComment: string;
  lastCommenter: string;
  QAN: string;
}

export default function TicketsListPage() {
  const router = useHistory();

  const [arrayChecks, setArrayChecks] = useState<string[]>([]);

  const data: ITickets[] = [];

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      return setArrayChecks(data?.map((item) => item.id));
    }
    return setArrayChecks([]);
  };

  const checkOne = (value: boolean, id: string) => {
    if (value) {
      return setArrayChecks([...arrayChecks, id]);
    }

    return setArrayChecks(arrayChecks.filter((idArray) => idArray !== id));
  };

  const onClickAddNewATickets = () => {
    router.push(URL_NEW_TICKETS);
  };

  return (
    <div>
      <div className={"wrapper"}>
        <div className={styles["rowAction"]}>
          <div>
            <Button onClick={onClickAddNewATickets}>Add new Tickets</Button>
          </div>
          <div>{/* <PaginationComp /> */}</div>
        </div>
      </div>
      <div>
        <table className={styles["table"]}>
          <thead className={styles.headerTable}>
            <tr>
              <th className={styles["tdCheckBox"]}>
                <FormCheck
                  type={"checkbox"}
                  className={classNames("checkbox", styles.checkBoxTable)}
                  onChange={checkAll}
                />
              </th>
              <th>Status</th>
              <th>ID</th>
              <th>Date</th>
              <th>Affiliate</th>
              <th>Manager</th>
              <th>Type</th>
              <th>Title</th>
              <th>Last day comment</th>
              <th>Last commenter</th>
              <th>Q / A / N</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr
                  className={classNames(styles.trTable, {
                    [styles.tableRowChecked]: arrayChecks.some(
                      (id) => id === item.id
                    ),
                  })}
                  key={item.id + index}
                >
                  <td className={styles["tdCheckBox"]}>
                    <FormCheck
                      type={"checkbox"}
                      className={classNames("checkbox", styles.checkBoxTable)}
                      onChange={(e) => checkOne(e.target.checked, item.id)}
                      checked={arrayChecks.some((id) => id === item.id)}
                    />
                  </td>
                  <td>{item.status}</td>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.affiliate}</td>
                  <td>{item.manager}</td>
                  <td>{item.type} </td>
                  <td>{item.title}</td>
                  <td>{item.lastDayComment}</td>
                  <td>{item.lastCommenter}</td>
                  <td>{item.QAN}</td>
                  <td>actions</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
