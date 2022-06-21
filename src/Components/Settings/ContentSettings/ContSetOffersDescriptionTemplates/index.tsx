import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useLanguage } from "Hooks";
import {
  ButtonComp,
  SelectLang,
  Icon,
  SpinnerLogo,
} from "Components/MiniComponents";
import AddEditOfferDescriptionsTelplate from "./AddEditOfferDescriptionTemplate";
import { Button } from "react-bootstrap";

import { IDescriptionsTemplate } from "./types";

import { SettingsApi } from "Helpers/api";

import styles from "../Styles/index.module.css";

export default function ContentSettingsOfferDescriptionsTemplate() {
  const { fetchSetOfferDescriptionsTemplate } = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSetOfferDescriptionsTemplate(setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offerpITemplateList = useAppSelector(
    (state) => state.Settings.offer_description_template
  );

  const { languagesNotGeneral, language, setLanguage } = useLanguage("eng");

  const [editData, setEditData] = useState<IDescriptionsTemplate | undefined>();

  const clickEditTemplate = (item: IDescriptionsTemplate) => {
    setEditData(item);
  };

  const onClickAddNewTemplate = () => {
    setEditData({ id: "new", text: "", title: "", lang: language });
  };

  const onClickDelete = (id: number | string) => {
    SettingsApi.deleleteSettingsOfferDescriptionsTemplate(id).then(() => {
      fetchSetOfferDescriptionsTemplate();
    });
  };

  return (
    <div className={styles.ContentWrapperPagesLarge}>
      <div className={styles.headerAddTags}>
        <h3>Offer Descriptions templates</h3>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={onClickAddNewTemplate}
        >
          <Icon icon={"plus"} mr />
          Add new Template
        </Button>
      </div>

      <AddEditOfferDescriptionsTelplate
        editData={editData}
        setEditData={setEditData}
      />
      <SelectLang
        languages={languagesNotGeneral}
        value={language}
        onSelect={setLanguage}
      />
      <div className={"spaceBlock32"}>
        {loading ? (
          <SpinnerLogo />
        ) : (
          <table className={styles.table}>
            <thead className={styles.headerTable}>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offerpITemplateList?.[language]?.map((item, index) => {
                return (
                  <tr className={styles.trTable} key={"Descriptions" + index}>
                    <td>{item.title}</td>

                    <td>
                      <ButtonComp
                        icon={"pencil"}
                        intent={"close-light-notML"}
                        onClick={() => clickEditTemplate(item)}
                      />
                      <ButtonComp
                        icon={"trash"}
                        intent={"close-light-notML"}
                        className={"trashBtn"}
                        onClick={() => {
                          onClickDelete(item.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
