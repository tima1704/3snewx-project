import React, { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { InvoicePages } from "../Constants";
import BillingAffiliatesInvoiceHistory from "./BillingAffiliatesInvoiceHistory";

import classNames from "classnames";
import styles from "./BillingAffiliatesInvoiceEditPrimaryInfo.module.css";
import {
  NavigationTabs,
  InputComp,
  InputTags,
} from "Components/MiniComponents";

import { IHistoryInvoice } from "./types";

const history: IHistoryInvoice[] = [
  {
    date: "2018-08-20",
    correctionsValue: "-",
    total: "30 USD",
    comment: "System generated",
  },
  {
    date: "2018-08-23",
    correctionsValue: "15 USD",
    total: "45 USD",
    comment: "Surcharge from the advertiser for the landing.",
  },
];

export default function BillingAffiliatesInvoiceEditPrimaryInfo() {
  const params = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);

  const onClickCorrection = () => {
    setOpen(!open);
  };

  const onSelect = () => {};

  return (
    <div className={"wrapper"}>
      {params ? (
        <div className={styles["mainRow"]}>
          <div className={classNames("contnent-50p", styles["form"])}>
            <h1 className={styles["title"]}>Invoice #{params.id}</h1>
            <NavigationTabs items={InvoicePages(params.id)} />

            <InputComp
              errors={[]}
              title={"ID"}
              classNameTitle={styles["titleBtnCompInactive"]}
            >
              <div className={styles["textVerticalAlign"]}>{params.id}</div>
            </InputComp>

            <InputComp
              errors={[]}
              title={"Affiliate"}
              classNameTitle={styles["titleBtnCompInactive"]}
            >
              <div className={styles["textVerticalAlign"]}>
                (2781) Limon.partners@gmail.com
              </div>
            </InputComp>

            <InputComp
              errors={[]}
              title={"Payment system"}
              classNameTitle={styles["titleBtnCompInactive"]}
            >
              <div className={styles["textVerticalAlign"]}>Epayments</div>
            </InputComp>

            <InputComp
              errors={[]}
              title={"Payment Account"}
              value={"Z258445133685"}
            />

            <InputComp errors={[]} title={"Payout"}>
              <div className={styles["payoutRow"]}>
                <div>30 USD</div>

                <Button
                  onClick={onClickCorrection}
                  variant={!open ? "outline-primary" : "danger"}
                  className={styles["btnCorrectrion"]}
                >
                  {!open ? "Correction" : "Cansel"}
                </Button>
              </div>
            </InputComp>

            <Collapse in={open} unmountOnExit={true}>
              <div>
                <InputComp errors={[]} title={"Comment"}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    //  onChange={onChangeComment}
                  />
                </InputComp>
              </div>
            </Collapse>

            <InputComp errors={[]} title={"Status"}>
              <InputTags onChange={onSelect} name={"status"} />
            </InputComp>

            <InputComp
              errors={[]}
              title={"Period"}
              classNameTitle={styles["titleBtnCompInactive"]}
            >
              <div className={styles["textVerticalAlign"]}>
                2018-10-11 - 2018-12-05
              </div>
            </InputComp>

            <div className={styles["btnSaveRow"]}>
              <Button className={styles["btnSave"]}>Save</Button>
            </div>
          </div>
          <BillingAffiliatesInvoiceHistory history={history} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
