import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "Hooks";

import { Button } from "react-bootstrap";
import ContentSettingsAddTag from "./AddTag";
import { ButtonComp, Icon } from "Components/MiniComponents";
import Skeleton from "react-loading-skeleton";

import { animateScroll } from "react-scroll";
import { SettingsApi } from "Helpers/api";

import { ITagSettings } from "./Types";

import styles from "../Styles/index.module.css";
import stylesTags from "./index.module.css";

const initialDataTag: ITagSettings = {
  name: "",
  title: "",
};

const placeholderTags = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function ContentSettingsTags() {
  const [editData, setEditData] = useState<ITagSettings | undefined>();
  const [loading, setLoading] = useState(true);

  const tagsData = useAppSelector((state) => state.Settings.tags);
  const { fetchSetTags, addAppToastSuccess } = useAppDispatch();

  useEffect(() => {
    fetchSetTags(setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickAddNewTag = () => {
    setEditData(initialDataTag);
  };

  const clickEditTag = (data: ITagSettings) => {
    animateScroll.scrollToTop();
    setEditData(data);
  };

  const clickDeleteTag = (id: number) => {
    SettingsApi.deleteSettingsTag(id).then(() => {
      fetchSetTags();
      addAppToastSuccess("Success delete");
    });
  };

  return (
    <div className={styles.ContentWrapperPages}>
      <div className={styles.headerAddTags}>
        <h3>Tags</h3>
        <Button
          disabled={editData ? true : false}
          onClick={clickAddNewTag}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon={"plus"} mr />
          Add New Tag
        </Button>
      </div>
      <ContentSettingsAddTag editData={editData} setEditData={setEditData} />
      <table className={styles.table}>
        <thead className={styles.headerTable}>
          <tr>
            <th className={stylesTags["title"]}>Title</th>
            <th className={stylesTags["tagAmount"]}>Tag amount</th>
            <th className={stylesTags["btns"]}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? placeholderTags.map((item, index) => (
                <tr className={styles.trTable} key={index + "tag"}>
                  <td className={stylesTags["title"]}>
                    <Skeleton className={stylesTags["skeleton"]} />
                  </td>
                  <td className={stylesTags["tagAmount"]}>
                    <Skeleton className={stylesTags["skeleton"]} />
                  </td>
                  <td className={styles["actionRowTable"]}>
                    <ButtonComp
                      icon={"pencil"}
                      intent={"close-light-notML"}
                      loading
                    />
                    <ButtonComp
                      icon={"trash"}
                      intent={"close-light-notML"}
                      className={"trashBtn"}
                      loading
                    />
                  </td>
                </tr>
              ))
            : tagsData?.map((item, index) => {
                return (
                  <tr className={styles.trTable} key={item.name + index}>
                    <td className={stylesTags["title"]}>{item.title}</td>
                    <td className={stylesTags["tagAmount"]}>{index}</td>
                    <td className={styles["actionRowTable"]}>
                      <ButtonComp
                        icon={"pencil"}
                        intent={"close-light-notML"}
                        onClick={() => {
                          clickEditTag(item);
                        }}
                      />
                      <ButtonComp
                        icon={"trash"}
                        intent={"close-light-notML"}
                        className={"trashBtn"}
                        onClick={() => {
                          if (item.id) {
                            clickDeleteTag(item.id);
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
