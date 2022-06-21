import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { animateScroll } from "react-scroll";
import { SKELETON_ARRAY } from "Constants/AppConstants";
import { SettingsApi } from "Helpers/api";

import { useAppDispatch, useAppSelector, useLanguage } from "Hooks";
import { ButtonComp, Icon, SelectLang } from "Components/MiniComponents";
import AddMessengerSettings from "./AddMessenger";
import Skeleton from "react-loading-skeleton";

import styles from "../Styles/index.module.css";

import { IMessenger, IMessengerEdit } from "./types";

export default function ContSetMessenger() {
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<IMessengerEdit | undefined>();
  const { language, setLanguage, languages } = useLanguage();

  const { fetchSetMessenger, addAppToastSuccess } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings?.messenger);

  const clickAddNewCategory = () => {
    const newCategory: IMessengerEdit = {};
    languages.forEach(({ value }) => {
      newCategory[value] = { title: "" };
    });
    setEditData(newCategory);
  };

  useEffect(() => {
    fetchSetMessenger(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickEditMessenger = (data: IMessenger) => {
    animateScroll.scrollToTop();
    setEditData(data);
  };

  const clickDeleteMessenger = (id: number) => {
    SettingsApi.deleteSettingsCategory(id).then(() => {
      fetchSetMessenger();
      addAppToastSuccess("Success delete");
    });
  };

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Messengers</h3>
        <Button
          disabled={editData ? true : false}
          onClick={clickAddNewCategory}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add new Messenger
        </Button>
      </div>
      <AddMessengerSettings setEditData={setEditData} editData={editData} />
      <div className={"spaceBlock32"}>
        <div className={"spaceBlock32"}>
          <SelectLang
            languages={languages}
            keyText={"cat"}
            value={language}
            onSelect={setLanguage}
          />
        </div>
        <div className={"spaceBlock32"}>
          {loading
            ? SKELETON_ARRAY.map((item, indexData) => (
                <div
                  key={indexData}
                  className={classNames(styles.rowItemData, "spaceBlock32")}
                >
                  <div style={{ width: "100%" }}>
                    <Skeleton className={"skeleton-input"} />
                  </div>
                  <ButtonComp
                    icon={"pencil"}
                    intent={"close-light"}
                    loading={loading}
                  />
                  <ButtonComp
                    icon={"trash"}
                    intent={"close-light-notML"}
                    className={styles.trashBtn}
                    loading={loading}
                  />
                </div>
              ))
            : data?.map((itemData, indexData) => {
                return (
                  <div
                    key={indexData}
                    className={classNames(styles.rowItemData, "spaceBlock32")}
                  >
                    <FormControl
                      readOnly
                      value={itemData[language]?.title || ""}
                    />
                    <ButtonComp
                      icon={"pencil"}
                      intent={"close-light"}
                      onClick={() => {
                        clickEditMessenger(itemData);
                      }}
                    />
                    <ButtonComp
                      icon={"trash"}
                      intent={"close-light-notML"}
                      className={styles.trashBtn}
                      onClick={() => {
                        if (itemData.general?.id) {
                          clickDeleteMessenger(itemData.general?.id);
                        }
                      }}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
