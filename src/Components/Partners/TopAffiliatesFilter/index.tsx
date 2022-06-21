import React from "react";
import { Button, FormControl } from "react-bootstrap";

import styles from "./TopAffiliatesFilter.module.css";

export default function TopAffiliatesFilter() {
  return (
    <div className={styles["filter"]}>
      <div className={styles["right"]}>
        <FormControl placeholder={"Date"} className={styles["dateInput"]} />
        <FormControl
          placeholder={"Percentage"}
          className={styles["dateInput"]}
        />
      </div>
      <div className={styles["left"]}>
        <FormControl className={styles["numberInput"]} />
        <Button className={styles["btn"]}>View</Button>
      </div>
    </div>
  );
}
