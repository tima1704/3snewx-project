import { useEffect, useState } from "react";

import { ISetUrls } from "./types";

import { Button } from "react-bootstrap";
import { Icon } from "Components/MiniComponents";
import AddSetUrls from "./AddSetUrls";
import ItemSysSetUrls from "./ItemSysSetUrls";

import { useAppDispatch, useAppSelector } from "Hooks";

import { SKELETON_ARRAY } from "Constants/AppConstants";

import styles from "../Styles/index.module.css";
import stylesPage from "./SysSetUrls.module.css";
import stylesTable from "Styles/table.module.css";

export default function SysSetUrls() {
  const [editData, setEditData] = useState<ISetUrls | undefined>();
  const [loading, setLoading] = useState(true);

  const { fetchSetTrackingDomainUrl } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings.tracking_url);

  useEffect(() => {
    fetchSetTrackingDomainUrl(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickAddNewUrls = () => {
    setEditData({
      link: "",
      is_http: false,
      is_https: false,
    });
  };

  return (
    <div className={styles["ContentWrapperPages"]}>
      <div className={styles["header"]}>
        <h3>URLs</h3>
        <Button
          disabled={editData ? true : false || loading}
          onClick={onClickAddNewUrls}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add new tracking site URL
        </Button>
      </div>
      <AddSetUrls editData={editData} setEditData={setEditData} />
      <div className={"spaceBlock32"}>
        <table className={stylesTable.table}>
          <thead className={stylesTable.headerTable}>
            <tr>
              <th className={stylesPage["urlName"]}>URL name</th>
              <th className={stylesPage["urlLink"]}>URL link</th>
              <th className={stylesPage["http"]}>HTTP</th>
              <th className={stylesPage["https"]}>HTTPS</th>
              <th className={stylesPage["options"]}>Options</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? SKELETON_ARRAY.map((item, index) => (
                  <ItemSysSetUrls
                    setEditData={setEditData}
                    key={"urls" + index}
                    loading={loading}
                    link={""}
                    is_http={false}
                    is_https={false}
                  />
                ))
              : data?.map((item, index) => (
                  <ItemSysSetUrls
                    {...item}
                    setEditData={setEditData}
                    key={"urls" + index}
                    loading={loading}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
