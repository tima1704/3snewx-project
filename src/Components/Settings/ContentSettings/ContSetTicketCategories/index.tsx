import React, { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import { useAppDispatch, useAppSelector, useLanguage } from "Hooks";
import { ITicketCategory, ITicketCategoryEdit } from "./types";

import { Button, FormControl } from "react-bootstrap";
import { ButtonComp, SelectLang, Icon } from "Components/MiniComponents";

import classNames from "classnames";
import AddContSetTicketCategories from "./AddContSetTicketCategories";
import { SettingsApi } from "Helpers/api";

import Skeleton from "react-loading-skeleton";
import { SKELETON_ARRAY } from "Constants/AppConstants";

import styles from "../Styles/index.module.css";

export default function ContSetTicketCategories() {
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<ITicketCategoryEdit | undefined>();
  const { language, setLanguage, languages } = useLanguage();

  const { fetchSetTiketsCategories, addAppToastSuccess } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings.ticket_type);

  const clickAddNewCategory = () => {
    const newCategory: ITicketCategoryEdit = {};
    languages.forEach(({ value }) => {
      newCategory[value] = { title: "" };
    });
    setEditData(newCategory);
  };

  useEffect(() => {
    fetchSetTiketsCategories(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickEditCategory = (data: ITicketCategory) => {
    animateScroll.scrollToTop();
    setEditData(data);
  };

  const clickDeleteCategory = (id: number) => {
    SettingsApi.deleteSettingsTicketCategory(id).then(() => {
      fetchSetTiketsCategories();
      addAppToastSuccess("Success delete");
    });
  };

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Ticket Categories</h3>
        <Button
          disabled={editData ? true : false}
          onClick={clickAddNewCategory}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add new Category
        </Button>
      </div>
      <AddContSetTicketCategories
        setEditData={setEditData}
        editData={editData}
      />
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
                        clickEditCategory(itemData);
                      }}
                    />
                    <ButtonComp
                      icon={"trash"}
                      intent={"close-light-notML"}
                      className={styles.trashBtn}
                      onClick={() => {
                        if (itemData.general?.id) {
                          clickDeleteCategory(itemData.general?.id);
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
