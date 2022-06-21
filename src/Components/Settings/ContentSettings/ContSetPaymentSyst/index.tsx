import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "Hooks";

import { Icon } from "Components/MiniComponents";

import AddPaymentSyst from "./AddPaymentSyst";
import ItemPaymentSyst from "./ItemPaymentSyst";
import { IPaymentSyst } from "./types";
import { SKELETON_ARRAY } from "Constants/AppConstants";

import styles from "../Styles/index.module.css";
import stylesPage from "./PaymentSyst.module.css";

const initiaalStatePaymentSyst: IPaymentSyst = {
  title: "",
  currencie: [],
  fields: [],
};

export default function ContSetPaymentSyst() {
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<IPaymentSyst | undefined>();

  const { fetchSetPaymentSettings } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings.paymnet_systems);

  const onClickAddPaymentSyst = () => {
    setEditData(initiaalStatePaymentSyst);
  };

  useEffect(() => {
    fetchSetPaymentSettings(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Payment systems</h3>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={onClickAddPaymentSyst}
          disabled={editData ? true : false || loading}
        >
          <Icon icon={"plus"} mr />
          Add new Payment systems
        </Button>
      </div>
      <AddPaymentSyst editData={editData} setEditData={setEditData} />
      <div className={"spaceBlock32"}>
        <table className={styles.table}>
          <thead className={styles.headerTable}>
            <tr>
              <th className={stylesPage["itemTitle"]}>Title</th>
              <th className={stylesPage["itemCurrencie"]}>Currency</th>
              <th className={stylesPage["itemFields"]}>Fields</th>
              <th className={stylesPage["itemActions"]}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? SKELETON_ARRAY.map((item, index) => (
                  <ItemPaymentSyst
                    index={index}
                    setEditData={setEditData}
                    key={"ps" + index}
                    title={""}
                    currencie={[]}
                    loading={loading}
                    fields={[]}
                  />
                ))
              : data?.map((paymentSystem, index) => (
                  <ItemPaymentSyst
                    {...paymentSystem}
                    index={index}
                    setEditData={setEditData}
                    key={"ps" + index}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
