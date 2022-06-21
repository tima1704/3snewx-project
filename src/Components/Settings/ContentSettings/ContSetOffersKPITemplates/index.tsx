import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useLanguage } from "Hooks";

import {
  ButtonComp,
  SelectLang,
  SpinnerLogo,
  Icon,
} from "Components/MiniComponents";
import AddEditOfferKPITelplate from "./AddEditOfferKPITemplate";
import { Button } from "react-bootstrap";

import styles from "../Styles/index.module.css";
import { IKPITemplate } from "./types";

import { SettingsApi } from "Helpers/api";

export default function ContentSettingsOfferKPITemplate() {
  const { fetchSetOfferKpiTemplate } = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSetOfferKpiTemplate(setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offerpITemplateList = useAppSelector(
    (state) => state.Settings.offer_kpi_template
  );

  const { languagesNotGeneral, language, setLanguage } = useLanguage("eng");

  const [editData, setEditData] = useState<IKPITemplate | undefined>();

  const clickEditTemplate = (item: IKPITemplate) => {
    setEditData(item);
  };

  const onClickAddNewTemplate = () => {
    setEditData({ id: "new", text: "", title: "", lang: language });
  };

  const onClickDelete = (id: number | string) => {
    SettingsApi.deleleteSettingsOfferKpiTemplate(id).then(() => {
      fetchSetOfferKpiTemplate();
    });
  };

  return (
    <div className={styles.ContentWrapperPagesLarge}>
      <div className={styles.headerAddTags}>
        <h3>Offer KPI templates</h3>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={onClickAddNewTemplate}
        >
          <Icon icon={"plus"} mr />
          Add new Template
        </Button>
      </div>

      <AddEditOfferKPITelplate editData={editData} setEditData={setEditData} />
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
                  <tr className={styles.trTable} key={"emailTeplate" + index}>
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
