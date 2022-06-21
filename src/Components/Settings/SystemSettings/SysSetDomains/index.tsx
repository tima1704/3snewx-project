import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "Hooks";

import { Button } from "react-bootstrap";
import AddSysSetDomains from "./AddSysSetDomains";
import ItemSysSetDomains from "./ItemSysSetDomains";
import { Icon } from "Components/MiniComponents";

import { ITrackingDomains } from "./types";

import { SKELETON_ARRAY } from "Constants/AppConstants";

import styles from "../Styles/index.module.css";
import stylesPage from "./SysSetDomains.module.css";
import stylesTable from "Styles/table.module.css";

export default function SysSetDomains() {
  const [editData, setEditData] = useState<ITrackingDomains | undefined>();
  const [loading, setLoading] = useState(true);

  const { fetchSetTrackingDomainUrl } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings.tracking_domain);
  const trackingUrl = useAppSelector((state) => state.Settings.tracking_url);

  useEffect(() => {
    fetchSetTrackingDomainUrl(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickAddNewUrls = () => {
    if (trackingUrl) {
      setEditData({
        domain: "",
        domain_type: "3SNET",
        main_domain: 0,
        is_http: false,
        is_https: false,
      });
    }
  };

  return (
    <div className={styles["ContentWrapperPages"]}>
      <div className={styles["header"]}>
        <h3>Tracking domains</h3>
        <Button
          disabled={editData ? true : false || loading}
          onClick={onClickAddNewUrls}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add new Tracking domains
        </Button>
      </div>
      <AddSysSetDomains editData={editData} setEditData={setEditData} />
      <div className={"spaceBlock32"}>
        <table className={stylesTable.table}>
          <thead className={stylesTable.headerTable}>
            <tr>
              <th className={stylesPage["urlName"]}>Domain</th>
              <th className={stylesPage["urlName"]}>Domain type</th>
              <th className={stylesPage["urlLink"]}>Main domain</th>
              <th className={stylesPage["http"]}>HTTP</th>
              <th className={stylesPage["https"]}>HTTPS</th>
              <th className={stylesPage["options"]}>Options</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? SKELETON_ARRAY.map((item, index) => (
                  <ItemSysSetDomains
                    setEditData={setEditData}
                    key={"domain" + index}
                    loading={loading}
                    domain={""}
                    domain_type={"3SNET"}
                    is_http={false}
                    is_https={false}
                    main_domain={1}
                  />
                ))
              : data?.map((item, index) => (
                  <ItemSysSetDomains
                    {...item}
                    setEditData={setEditData}
                    key={"domain" + index}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
