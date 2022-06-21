import classNames from "classnames";
import React from "react";
import { FilterBtn, InputSearch } from "Components/MiniComponents";

import styles from "../BillingAffiliatesTable.module.css";

export default function BillingAffiliatesFilter() {
  return (
    <div className={classNames("wrapper", styles["filter"])}>
      <div className={styles["filterInputs"]}>
        <InputSearch />
        <InputSearch />
        <InputSearch />
        <InputSearch />
        <InputSearch />
      </div>
      <div>
        <FilterBtn />
      </div>
    </div>
  );
}
