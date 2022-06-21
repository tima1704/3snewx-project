import { useState } from "react";
import { useAppSelector } from "Hooks";
import {ButtonComp} from "Components/MiniComponents";

// import { Button } from "react-bootstrap";
// import { useLanguage } from "Hooks";

import styles from "../Styles/index.module.css";

import AddEmailTemplates from "./AddEmailTemplates";
import { IEmailTemplatesEdit } from "./types";

export default function ContSetEmailTemplates() {
  const [editData, setEditData] = useState<IEmailTemplatesEdit | undefined>();
  // const [loading, setLoading] = useState(true);

  const emailTemplatesList = useAppSelector(
    (state) => state.Settings.email_templates
  );

  // const onClickEdit = (type: string, object: any) => {

  // };

  return (
    <div className={styles.ContentWrapperPagesLarge}>
      <div className={styles.headerAddTags}>
        <h3>Email templates</h3>
        {/* <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={onclickAddEmailTemlpate}
        >
          <Icon icon={"plus"} mr />
          Add new Template
        </Button> */}
      </div>

      <AddEmailTemplates editData={editData} setEditData={setEditData} />

      <div className={"spaceBlock32"}>
        <table className={styles.table}>
          <thead className={styles.headerTable}>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emailTemplatesList &&
              Object.entries(emailTemplatesList)?.map(([type, item], index) => {
                return (
                  <tr className={styles.trTable} key={"emailTeplate" + index}>
                    <td>{type}</td>
                    <td>{item["eng"].template?.title}</td>
                    <td>{item["eng"].template?.status}</td>
                    <td>
                      <ButtonComp
                        icon={"pencil"}
                        intent={"close-light-notML"}
                        // onClick={() => clickEditTag(item)}
                      />
                      {/* <ButtonComp
                      icon={"trash"}
                      intent={"close-light-notML"}
                      className={"trashBtn"}
                      // onClick={() => {
                      //   clickDeleteTag(item.id);
                      // }}
                    /> */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
