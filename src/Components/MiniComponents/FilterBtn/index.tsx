import React from "react";

import { Button, Form } from "react-bootstrap";
import classNames from "classnames";

import styles from "./FilterBtn.module.css";

export default function FilterBtn() {
  return (
    <div className={styles["btnRow"]}>
      <Form.Control className={styles["input"]} value={100} />
      <Button className={classNames(styles["btn"], styles["view"])}>
        View
      </Button>
      <Button className={classNames(styles["btn"], styles["reset"])}>
        Reset Filters
      </Button>
    </div>
  );
}
