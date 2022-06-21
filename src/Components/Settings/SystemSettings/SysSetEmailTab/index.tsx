import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "Hooks";

import AddEmail from "./AddEmail";
import { ISettingsEmail, placeholerEmailServer } from "./Constants";
import SysSetItemEmail from "./ItemEmail";

import styles from "../Styles/index.module.css";

export default function SysSetEmailTab() {
  const [editData, setEditData] = useState<ISettingsEmail | undefined>();
  const [loading, setLoading] = useState(true);

  const mailsData = useAppSelector((state) => state.Settings.mail_server);
  const { fetchSetEmail } = useAppDispatch();

  useEffect(() => {
    fetchSetEmail(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["ContentWrapperPages"]}>
      <AddEmail editData={editData} setEditData={setEditData} />
      {!loading
        ? mailsData?.map((email, index) => (
            <SysSetItemEmail
              {...email}
              setEditData={setEditData}
              disabledDelete={editData ? true : false}
              key={index + "emaol-server"}
            />
          ))
        : placeholerEmailServer.map((email, index) => (
            <SysSetItemEmail
              key={index + "email-server-placeholder"}
              {...email}
              loading
            />
          ))}
    </div>
  );
}
