import { useEffect } from "react";

import AffiliateManagementTableFilter from "Components/Partners/AffiliateManagment/AffiliateManagementTableFilter";
import AffiliateTable from "Components/Partners/AffiliateManagment/AffiliatesTable";
import { Button } from "react-bootstrap";

import { useAppDispatch } from "Hooks";

import { Link } from "react-router-dom";
import { URL_PARTNERS_MANAGMENT_NEW } from "Constants/URLConstants/URLCabinet/URLPartners";

import styles from "Components/Partners/AffiliateManagment/AffiliatesTable/index.module.css";

export default function AffiliateMangmentTable() {
  const { fetchAffiliateList } = useAppDispatch();

  useEffect(() => {
    fetchAffiliateList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AffiliateManagementTableFilter />
      <div className={styles["rowAction"]}>
        <div>
          <Link to={URL_PARTNERS_MANAGMENT_NEW}>
            <Button>Add new Affiliates</Button>
          </Link>
          {/* <ButtonComp
        intent={"close-light"}
        icon={"import"}
        onClick={onClickImportAffiliates}
      />
      <ButtonComp
        intent={"close-light"}
        icon={"export"}
        onClick={onClickExportAffiliates}
      /> */}
        </div>
      </div>
      <AffiliateTable />
    </div>
  );
}
