import classNames from "classnames";
import React from "react";
import { Button, FormCheck, FormControl } from "react-bootstrap";

import styles from "./AffiliatesAnAuthLogFilter.module.css";

export default function AffiliatesAnAuthLogFilter() {
  return (
    <div className={styles["filter"]}>
      <div className={styles["right"]}>
        <FormControl placeholder={"Date"} className={styles["dateInput"]} />
        <FormCheck
          label={"Show affiliates with the same IP address"}
          className={classNames("checkbox", styles["checkboxInput"])}
          id={"affilLogCheck"}
        />
      </div>
      <div className={styles["left"]}>
        <FormControl className={styles["numberInput"]} />
        <Button className={styles["btn"]}>View</Button>
      </div>
    </div>
  );
}
