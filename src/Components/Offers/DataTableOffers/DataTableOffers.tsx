import React, { useCallback, useState } from "react";

// import styles from "./DataTableOffers.module.css";

import classNames from "classnames";
import { FormCheck } from "react-bootstrap";

import styles from "Styles/table.module.css";
import stylesComp from "./DataTableOffers.module.css";
import { useAppSelector } from "Hooks";

import Skeleton from "react-loading-skeleton";
import { ButtonComp, Icon } from "Components/MiniComponents";
import { useHistory } from "react-router";

import { URL_OFFER } from "Constants/URLConstants/URLCabinet";

import { animateScroll } from "react-scroll";
import { Link } from "react-router-dom";

const placeHolderData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function DataTableOffers({ loading = false, draft = false }) {
  const offers = useAppSelector((state) => state.Offers.list);

  const history = useHistory();

  const [arrayChecks, setArrayChecks] = useState<number[]>([]);

  const checkAll: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      return setArrayChecks(offers.map((item) => item.id));
    }

    return setArrayChecks([]);
  };

  const checkOne = (value: boolean, id: number) => {
    if (value) {
      return setArrayChecks([...arrayChecks, id]);
    }

    return setArrayChecks(arrayChecks.filter((idArray) => idArray !== id));
  };

  const linkCard = useCallback(
    (id: string) => {
      return draft
        ? URL_OFFER.URL_OFFERS_DRAFT_CARD_ID(id)
        : URL_OFFER.URL_OFFER_CARD_ID(id);
    },
    [draft]
  );

  const onClickStatick = (id: number | string) => {};
  const onClickEdit = (id: string) => {
    animateScroll.scrollToTop();
    history.push(URL_OFFER.URL_OFFERS_EDIT_TAB(draft, id));
  };
  const onClickCopy = (id: number | string) => {};
  const onClickDelete = (id: number | string) => {};

  return (
    <div className={stylesComp["main"]}>
      <table className={styles.table}>
        <thead className={styles.headerTable}>
          <tr
            className={classNames({
              [styles.tableRowChecked]: arrayChecks.length > 0 && !loading,
            })}
          >
            <th className={styles["tdCheckBox"]}>
              <FormCheck
                type={"checkbox"}
                className={classNames("checkbox", styles.checkBoxTable)}
                onChange={checkAll}
                checked={arrayChecks.length === offers.length && !loading}
              />
            </th>
            <th className={classNames(styles["center"], stylesComp["id"])}>
              ID
            </th>
            <th className={classNames(styles["center"], stylesComp["title"])}>
              Title
            </th>
            <th className={styles["center"]}>Status</th>
            <th
              className={classNames(styles["center"], stylesComp["categories"])}
            >
              Categories
            </th>
            <th
              className={classNames(styles["center"], stylesComp["categories"])}
            >
              Traffic Sources
            </th>
            <th className={styles["center"]}>Affiliates</th>
            <th className={classNames(styles["center"], stylesComp["notes"])}>
              Notes
            </th>
            <th className={stylesComp["actions"]}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? placeHolderData.map((item, index) => (
                <tr className={styles.trTable} key={index + "table_tr"}>
                  <td className={styles["tdCheckBox"]}>
                    <FormCheck
                      type={"checkbox"}
                      disabled
                      className={classNames("checkbox", styles.checkBoxTable)}
                    />
                  </td>
                  <td className={styles["center"]}>
                    <Skeleton className={stylesComp["skeleton"]} />
                  </td>
                  <td className={styles["center"]}>
                    <Skeleton className={stylesComp["skeleton"]} />
                  </td>
                  <td className={styles["center"]}>
                    <Skeleton className={stylesComp["skeleton"]} />
                  </td>
                  <td className={styles["center"]}>
                    <Skeleton className={stylesComp["skeleton"]} />
                  </td>
                  <td className={styles["center"]}>
                    <Skeleton className={stylesComp["skeleton"]} />
                  </td>
                  <td className={styles["center"]}>
                    <Skeleton className={stylesComp["skeleton"]} />
                  </td>
                  <td className={styles["center"]}>
                    <Skeleton className={stylesComp["skeleton"]} />
                  </td>
                  <td className={stylesComp["actions"]}>
                    <ButtonComp
                      intent={"close-light-notML"}
                      icon={"graph"}
                      loading
                    />
                    <ButtonComp intent={"close-light"} icon={"graph"} loading />
                    <ButtonComp intent={"close-light"} icon={"graph"} loading />
                    <ButtonComp intent={"close-light"} icon={"graph"} loading />
                  </td>
                </tr>
              ))
            : offers?.map((item, index) => {
                return (
                  <tr
                    className={classNames(styles.trTable, {
                      [styles.tableRowChecked]: arrayChecks.some(
                        (id) => id === item.id
                      ),
                    })}
                    key={item.id + "table_tr"}
                  >
                    <td className={styles["tdCheckBox"]}>
                      <FormCheck
                        type={"checkbox"}
                        className={classNames("checkbox", styles.checkBoxTable)}
                        onChange={(e) => checkOne(e.target.checked, item.id)}
                        checked={arrayChecks.some((id) => id === item.id)}
                      />
                    </td>
                    <td className={styles["center"]}>
                      <Link to={linkCard(item.id.toString())}>
                        {item["id"]}
                      </Link>
                    </td>
                    <td className={styles["center"]}>
                      <Link to={linkCard(item.id.toString())}>
                        {item.title || ""}
                      </Link>
                    </td>
                    <td className={styles["center"]}>{item["status"]}</td>
                    <td className={styles["center"]}>
                      {item["categories"]?.map((item) => item.title).join(", ")}
                    </td>
                    <td className={styles["center"]}>
                      {item["trafficSources"]
                        ?.map((item) => item.title)
                        .join(", ")}
                    </td>
                    <td className={styles["center"]}>
                      {item["affiliates"]?.enabled.length}{" "}
                      <Icon icon={"members"} />
                    </td>
                    <td className={styles["center"]}>{item["notes"] || ""}</td>
                    <td className={stylesComp["actions"]}>
                      <ButtonComp
                        intent={"close-light-notML"}
                        icon={"graph"}
                        onClick={() => {
                          onClickStatick(item.id);
                        }}
                      />
                      <ButtonComp
                        intent={"close-light"}
                        icon={"pencil"}
                        onClick={() => {
                          onClickEdit(item.id.toString());
                        }}
                      />
                      <ButtonComp
                        intent={"close-light"}
                        icon={"duplicate"}
                        onClick={() => {
                          onClickCopy(item.id);
                        }}
                      />
                      <ButtonComp
                        intent={"close-light"}
                        icon={"trash"}
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
    </div>
  );
}
