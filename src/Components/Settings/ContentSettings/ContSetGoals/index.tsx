import classNames from "classnames";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "Hooks";

import { Button, FormControl } from "react-bootstrap";
import { ButtonComp, Icon } from "Components/MiniComponents";
import Skeleton from "react-loading-skeleton";
import AddGoalContentSettings from "./addGoal";

import { IGoalSet } from "./types";

import { SKELETON_ARRAY } from "Constants/AppConstants";
import { SettingsApi } from "Helpers/api";

import styles from "../Styles/index.module.css";

const initialDataGoal: IGoalSet = {
  title: "",
};

export default function ContentSettingsGoals() {
  const [editData, setEditData] = useState<IGoalSet | undefined>();
  const [loading, setLoading] = useState(true);

  const { fetchSetGoals, addAppToastSuccess } = useAppDispatch();
  const data = useAppSelector((state) => state.Settings.goals);

  const clickAddNewGoal = () => {
    setEditData(initialDataGoal);
  };

  useEffect(() => {
    fetchSetGoals(setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickEdit = (item: IGoalSet) => {
    setEditData(item);
  };

  const onClickDeleteGoal = (id?: string | number) => {
    if (id) {
      SettingsApi.deleteGoal(id).then(() => {
        fetchSetGoals();
        addAppToastSuccess("Success delete");
      });
    }
  };

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Goals</h3>
        <Button
          disabled={editData ? true : false}
          onClick={clickAddNewGoal}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add New Goal
        </Button>
      </div>
      <AddGoalContentSettings editData={editData} setEditData={setEditData} />
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
          : data?.map((itemData, indexData) => (
              <div
                key={indexData + "goalSet"}
                className={classNames(styles.rowItemData, "spaceBlock32")}
              >
                <FormControl readOnly value={itemData.title || ""} />
                <ButtonComp
                  icon={"pencil"}
                  intent={"close-light"}
                  onClick={() => {
                    onClickEdit(itemData);
                  }}
                />
                <ButtonComp
                  icon={"trash"}
                  intent={"close-light-notML"}
                  className={styles.trashBtn}
                  onClick={() => {
                    onClickDeleteGoal(itemData.id);
                  }}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
