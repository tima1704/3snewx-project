import classNames from "classnames";
import { Spinner } from "react-bootstrap";
import Logo from ".";

import styles from "./index.module.css";

export default function SpinnerLogo() {
  return (
    <div className={classNames(styles["main"])}>
      <div className={styles["logo"]}>
        <div className={styles["logoImg"]}>
          <Logo />
        </div>
        <div className={styles["centerSpinner"]}>
          <Spinner animation={"border"} variant="primary" className={styles["spinerSize"]} />
        </div>
      </div>
    </div>
  );
}
