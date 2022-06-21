import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import {
  URL_PARTNERS_AFFILIATES_AN_AUTH_LOG,
  URL_PARTNERS_MANAGMENT,
  URL_PARTNERS_TESTING_LINKS,
  URL_PARTNERS_TOP_AFFILIATES,
} from "Constants/URLConstants/URLCabinet/URLPartners";

import styles from "Styles/pagesStyles/PartnersPages.module.css";

export default function PartnersRouteList() {
  return (
    <div className={classNames(styles.setList)}>
      <Link to={URL_PARTNERS_MANAGMENT}>
        <h2>Affiliate management</h2>
      </Link>
      <Link to={URL_PARTNERS_AFFILIATES_AN_AUTH_LOG}>
        <h2>Affiliates an auth log</h2>
      </Link>
      <Link to={URL_PARTNERS_TESTING_LINKS}>
        <h2>Testing links</h2>
      </Link>
      <Link to={URL_PARTNERS_TOP_AFFILIATES}>
        <h2>TOP affiliates</h2>
      </Link>
    </div>
  );
}
