import { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import { SKELETON_ARRAY } from "Constants/AppConstants";
import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAppSelector, useLanguage } from "Hooks";

import { Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { ButtonComp, Icon, SelectLang } from "Components/MiniComponents";
import AddContSetTrafficSources from "./addContSetTrafficSources";

import { ITrafficSources, ITrafficSourcesEdit } from "./types";

import styles from "../Styles/index.module.css";

export default function ContentSettingTrafficSources() {
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<ITrafficSourcesEdit | undefined>();
  const { language, setLanguage, languages } = useLanguage();

  const { fetchSetTrafficSources, addAppToastSuccess } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings.traffciSources);

  const clickAddNew = () => {
    const newTrafficSources: ITrafficSourcesEdit = {};
    languages.forEach(({ value }) => {
      newTrafficSources[value] = { title: "" };
    });
    setEditData(newTrafficSources);
  };

  const clickEdit = (data: ITrafficSources) => {
    animateScroll.scrollToTop();
    setEditData(data);
  };

  const clickDelete = (id: number) => {
    SettingsApi.deleteSettingsTrafficSources(id).then(() => {
      fetchSetTrafficSources();
      addAppToastSuccess("Success delete");
    });
  };

  useEffect(() => {
    fetchSetTrafficSources(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Traffic sources</h3>
        <Button
          disabled={editData ? true : false || loading}
          onClick={clickAddNew}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add New Traffic sources
        </Button>
      </div>

      <AddContSetTrafficSources editData={editData} setEditData={setEditData} />

      <div>
        <SelectLang
          languages={languages}
          keyText={"addLang"}
          value={language}
          onSelect={setLanguage}
        />
        <table className={styles.table}>
          <thead className={styles.headerTable}>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? SKELETON_ARRAY.map((item, index) => (
                  <tr className={styles.trTable} key={index + "Traffic"}>
                    <td style={{ width: "100%" }}>
                      <Skeleton className={"skeleton-input"} />
                    </td>
                    <td className={styles["actionRowTable"]}>
                      <ButtonComp
                        icon={"pencil"}
                        intent={"close-light-notML"}
                        loading={loading}
                      />
                      <ButtonComp
                        icon={"trash"}
                        intent={"close-light-notML"}
                        className={"trashBtn"}
                        loading={loading}
                      />
                    </td>
                  </tr>
                ))
              : data?.map((item, index) => {
                  return (
                    <tr className={styles.trTable} key={index + "Traffic"}>
                      <td style={{ width: "100%" }}>{item[language]?.title}</td>
                      <td className={styles["actionRowTable"]}>
                        <ButtonComp
                          icon={"pencil"}
                          intent={"close-light-notML"}
                          onClick={() => clickEdit(item)}
                        />
                        <ButtonComp
                          icon={"trash"}
                          intent={"close-light-notML"}
                          className={"trashBtn"}
                          onClick={() => {
                            clickDelete(item.general.id);
                          }}
                        />
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
