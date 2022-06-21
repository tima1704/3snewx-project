import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "Hooks";
import { ButtonComp, SpinnerLogo } from "Components/MiniComponents";

import AddCurrienceSettings from "./addCurriencies";
import { ICurrence } from "./types";

import styles from "../Styles/index.module.css";

export default function ContSetCurrencies() {
  const { fetchSetCurriences } = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const [editData, setEditData] = useState<undefined | ICurrence>();

  useEffect(() => {
    fetchSetCurriences(setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useAppSelector((state) => state.Settings.currencies);

  const onClickEditCurrence = (data: ICurrence) => {
    setEditData(data);
  };

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Currencies</h3>
      </div>

      <AddCurrienceSettings editData={editData} setEditData={setEditData} />

      <div className={"spaceBlock32"}>
        <table className={styles.table}>
          <thead className={styles.headerTable}>
            <tr>
              <th>Code</th>
              <th>Min payment</th>
              <th>Active</th>
              <th>Default</th>
              <th>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.currencie.map((item, index) => {
              return (
                <tr className={styles.trTable} key={item.code + index}>
                  <td>{item.code}</td>
                  <td>{item.minPayment}</td>
                  <td>{item.status}</td>
                  <td>{item.code === data.default_currencie ? "Yes" : "No"}</td>
                  <td>{item.rate}</td>
                  <td>
                    <ButtonComp
                      icon={item.status === "active" ? "power-red" : "power"}
                      intent={"close-light-notML"}
                      // onClick={() => clickEditTag(item)}
                    />
                    <ButtonComp
                      icon={"pencil"}
                      intent={"close-light-notML"}
                      className={"trashBtn"}
                      onClick={() => {
                        onClickEditCurrence(item);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
            {loading && <SpinnerLogo />}
          </tbody>
        </table>
      </div>
    </div>
  );
}
