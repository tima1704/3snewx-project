import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useLanguage } from "Hooks";

import {
  ButtonComp,
  SelectLang,
  SpinnerLogo,
  Icon,
} from "Components/MiniComponents";

import { Button } from "react-bootstrap";

import { IGoalTemplate } from "./types";

import AddEditOfferGoalTelplate from "./AddEditOfferGoalTemplate";
import { SettingsApi } from "Helpers/api";

import styles from "../Styles/index.module.css";

export default function ContentSettingsOfferGoalTemplate() {
  const { fetchSetOfferGoalTemplate } = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSetOfferGoalTemplate(setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offerpITemplateList = useAppSelector(
    (state) => state.Settings.offer_goal_template
  );

  const { languagesNotGeneral, language, setLanguage } = useLanguage("eng");

  const [editData, setEditData] = useState<IGoalTemplate | undefined>();

  const clickEditTemplate = (item: IGoalTemplate) => {
    setEditData(item);
  };

  const onClickAddNewTemplate = () => {
    setEditData({ id: "new", text: "", title: "", lang: language });
  };

  const onClickDelete = (id: number | string) => {
    SettingsApi.deleleteSettingsOfferGoalTemplate(id).then(() => {
      fetchSetOfferGoalTemplate();
    });
  };

  return (
    <div className={styles.ContentWrapperPagesLarge}>
      <div className={styles.headerAddTags}>
        <h3>Offer Goal templates</h3>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={onClickAddNewTemplate}
        >
          <Icon icon={"plus"} mr />
          Add new Template
        </Button>
      </div>

      <AddEditOfferGoalTelplate editData={editData} setEditData={setEditData} />
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
                  <tr className={styles.trTable} key={"Goal" + index}>
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
