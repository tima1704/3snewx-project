import styles from "./BillingAffiliatesTable.module.css";
// import stylesTable from "Styles/table.module.css";
import { useHistory } from "react-router";
import { URL_BILLING } from "Constants/URLConstants/URLCabinet";
import { ButtonComp } from "Components/MiniComponents";
import classNames from "classnames";

import { Button } from "react-bootstrap";
import BillingAffiliatesFilter from "./Filter";

export default function BillingAffiliatesTable() {
  const router = useHistory();

  const onClickGenerateInvoice = () => {
    router.push(URL_BILLING.URL_BILLING_AFF_CREATE_INVOICE);
  };

  const onClickExportInvoice = () => {
    router.push(URL_BILLING.URL_BILLING_AFFILIATES_EXPORT);
  };

  return (
    <div>
      <div>
        <BillingAffiliatesFilter />
        <div className={classNames("wrapper", styles["btnRow"])}>
          <div>
            <Button onClick={onClickGenerateInvoice}>Generate Invoice</Button>
            <ButtonComp
              icon={"export"}
              intent={"close-light"}
              onClick={onClickExportInvoice}
            />
          </div>
          <div>Pagination</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
