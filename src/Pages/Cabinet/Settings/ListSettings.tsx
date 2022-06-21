import React from "react";
import { Link } from "react-router-dom";

import SYSTEM_SETTINGS_URL from "Components/Settings/SystemSettings/Constants";
// import CONTENT_SETTINGS_URL from "Components/Settings/Content/Constants";
// import AFFILIATE_DASHBOARD_DESIGN_SETTINGS_URL from "Components/Settings/AffiliateDashboardDesign/Constants";

import classNames from "classnames";
import CONTENT_SETTINGS_URL from "Components/Settings/ContentSettings/Constants";

import styles from "Styles/pagesStyles/SettingsPages.module.css";

export default function ListSettings() {
  return (
    <div className={classNames(styles.ContentWrapper, styles.setList)}>
      <div className={styles["systemSettings"]}>
        <h2>System settings</h2>
        <div>
          {SYSTEM_SETTINGS_URL.map((item, index) => {
            return (
              <div key={item.to + index} className={styles["link"]}>
                <Link to={item.to}>{item.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles["DashboardSettings"]}>
        <h2>Affiliate dashboard design</h2>
        <div>
          {/* {AFFILIATE_DASHBOARD_DESIGN_SETTINGS_URL.map((item, index) => {
            return (
              <div key={item.to + index} className={styles["link"]}>
                <Link to={item.to}>{item.title}</Link>
              </div>
            );
          })} */}
        </div>
      </div>
      <div className={styles["ContentSettings"]}>
        <h2>Content</h2>
        <div>
          {CONTENT_SETTINGS_URL.map((item, index) => {
            return (
              <div key={item.to + index} className={styles["link"]}>
                <Link to={item.to}>{item.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
