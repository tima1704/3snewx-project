import classNames from "classnames";
import { FormCheck } from "react-bootstrap";
import { Link } from "react-router-dom";
import { URL_PARTNERS } from "Constants/URLConstants/URLCabinet";
import { useAppSelector } from "Hooks";

import styles from "Styles/table.module.css";
import { ButtonComp, Icon, SpinnerLogo } from "Components/MiniComponents";

export default function AffiliateTable() {
  const affiliateList = useAppSelector(
    (state) => state.Affiliate.affiliateList
  );

  return (
    <div>
      <table className={styles["table"]}>
        <thead className={styles.headerTable}>
          <tr>
            <th className={styles["tdCheckBox"]}>
              <FormCheck
                type={"checkbox"}
                className={classNames("checkbox", styles.checkBoxTable)}
                //   onChange={checkAll}
              />
            </th>
            <th>ID</th>
            <th>Email</th>
            <th>Status</th>
            <th>Manager</th>
            <th>Connected offers</th>
            <th>Registered</th>
            <th>Doubled</th>
            <th>Information</th>
            <th className={styles["actionsThree"]}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {affiliateList?.map((item, index) => {
            return (
              <tr
                className={classNames(styles.trTable, {
                  // [styles.tableRowChecked]: arrayChecks.some(
                  //   (id) => id === item.id
                  // ),
                })}
                key={item.id + index}
              >
                <td className={styles["tdCheckBox"]}>
                  {/* <FormCheck
                      type={"checkbox"}
                      className={classNames("checkbox", styles.checkBoxTable)}
                      onChange={(e) => checkOne(e.target.checked, item.id)}
                      checked={arrayChecks.some((id) => id === item.id)}
                    /> */}
                </td>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
                <td>{item.manager.name}</td>
                <td>{item.connectOffer}</td>
                <td>{item.registered} </td>
                <td>{item.isDoubled ? "Yes" : "-"}</td>
                <td>
                  <Icon icon={"info"} />
                </td>
                <td className={styles["actionsThree"]}>
                  <ButtonComp icon={"graph"} intent={"close-light-notML"} />
                  <Link
                    to={URL_PARTNERS.URL_PARTNERS_MANAGMENT_AFFILIATES(
                      item.id,
                      "primary-info"
                    )}
                  >
                    <ButtonComp icon={"pencil"} intent={"close-light"} />
                  </Link>
                  <ButtonComp icon={"trash"} intent={"close-light"} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!affiliateList && <SpinnerLogo />}
    </div>
  );
}
