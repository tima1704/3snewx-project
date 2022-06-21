import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { InputComp, Line } from "Components/MiniComponents";

import styles from "./BillingAffiliatesExport.module.css";

const exportConstract = [
  { text: "ID Invoice", id: 1 },
  { text: "Payout", id: 2 },
  { text: "Affiliate", id: 3 },
  { text: "Status", id: 4 },
  { text: "Payment system", id: 5 },
  { text: "Date", id: 6 },
  { text: "Payment account", id: 7 },
  { text: "Conversions", id: 8 },
];

export default function BillingAffiliatesExport() {
  const router = useHistory();

  const onClickCansel = () => {
    router.goBack();
  };

  const [fields, setFields] = useState<number[]>([]);

  const onCheckedField = (id: number, value: boolean) => {
    if (!value) {
      return setFields(fields.filter((item) => item !== id));
    }

    setFields([...fields, id]);
  };

  const onClickSelectAll = (value: boolean) => {
    if (value) {
      return setFields(exportConstract.map((item) => item.id));
    }
    return setFields([]);
  };

  return (
    <div className={"wrapper"}>
      <h1 className={styles.title}>Export invoices</h1>
      <div className={classNames("contnent-50p", styles["exportForm"])}>
        <InputComp title={"Fields"} errors={[]} name={"fields"}>
          <div>
            <div className={styles["export-fields"]}>
              {exportConstract.map((item) => {
                return (
                  <Form.Check
                    type="checkbox"
                    label={item.text}
                    key={item.id}
                    id={"exportField" + item.id}
                    checked={fields.includes(item.id)}
                    onChange={(e) => onCheckedField(item.id, e.target.checked)}
                    className={"checkbox"}
                  />
                );
              })}
            </div>
            <Line className={styles["line"]} />
            <Form.Check
              type="checkbox"
              label={"Select all"}
              className={"checkbox"}
              id={"exportFieldAll"}
              onChange={(e) => onClickSelectAll(e.target.checked)}
              checked={fields.length === exportConstract.length}
            />
          </div>
        </InputComp>
        <div className={styles["btnRow"]}>
          <Button
            variant="danger"
            onClick={onClickCansel}
            className={styles["canselBtn"]}
          >
            Cancel
          </Button>
          <Button className={styles["exportBtn"]}>Export</Button>
        </div>
      </div>
    </div>
  );
}
