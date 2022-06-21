import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { animateScroll } from "react-scroll";
import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAppSelector, useLanguage } from "Hooks";
import { ButtonComp, Icon, SelectLang } from "Components/MiniComponents";

import AddCategoriesSettings from "./AddCategories";
import { ICategory, ICategoryEdit } from "./types";

import Skeleton from "react-loading-skeleton";
import { SKELETON_ARRAY } from "Constants/AppConstants";

import styles from "../Styles/index.module.css";

export default function ContentCategories() {
  const [editData, setEditData] = useState<ICategoryEdit | undefined>();
  const [loading, setLoading] = useState(true);
  const { language, setLanguage, languages } = useLanguage();

  const { fetchSetCategories, addAppToastSuccess } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings.categories);

  const clickAddNewCategory = () => {
    const newCategory: ICategoryEdit = {};
    languages.forEach(({ value }) => {
      newCategory[value] = { title: "" };
    });
    setEditData(newCategory);
  };

  useEffect(() => {
    fetchSetCategories(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickEditCategory = (data: ICategory) => {
    animateScroll.scrollToTop();
    setEditData(data);
  };

  const clickDeleteCategory = (id: number) => {
    SettingsApi.deleteSettingsCategory(id).then(() => {
      fetchSetCategories();
      addAppToastSuccess("Success delete");
    });
  };

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Categories</h3>
        <Button
          disabled={loading}
          onClick={clickAddNewCategory}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add new Category
        </Button>
      </div>
      <AddCategoriesSettings setEditData={setEditData} editData={editData} />
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
