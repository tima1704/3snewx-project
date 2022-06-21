import { Dispatch, SetStateAction } from "react";
import { IPaymentSyst } from "./types";

import { ButtonComp } from "Components/MiniComponents";
import { SettingsApi } from "Helpers/api";
import { useAppDispatch } from "Hooks";

import { animateScroll } from "react-scroll";

import Skeleton from "react-loading-skeleton";

import { getObjectOfArray } from "Helpers/CustomFunc";
import CurrienceOptions from "Data/Static/currency.json";

import styles from "../Styles/index.module.css";
import stylesPage from "./PaymentSyst.module.css";

interface itemPaymentSystProps extends IPaymentSyst {
  loading?: boolean;
  setEditData: Dispatch<SetStateAction<IPaymentSyst | undefined>>;
  index: number;
}

export default function ItemPaymentSyst({
  title,
  loading,
  fields,
  currencie,
  id,
  setEditData,
  index,
}: itemPaymentSystProps) {
  const { fetchSetPaymentSettings, addAppToastSuccess } = useAppDispatch();

  const clickEditPS = () => {
    animateScroll.scrollToTop();
    setEditData({ id, title, fields, currencie });
  };

  const onClickDeletePS = () => {
    if (id) {
      SettingsApi.deleteSettingsPaymentSystem(id).then(() => {
        fetchSetPaymentSettings();
        addAppToastSuccess("Success delete");
      });
    }
  };

  return (
    <tr className={styles.trTable}>
      <td className={stylesPage["itemTitle"]}>
        {loading ? <Skeleton className={"skeleton-input"} /> : title}
      </td>
      <td className={stylesPage["itemCurrencie"]}>
        {loading ? (
          <Skeleton className={"skeleton-input"} />
        ) : (
          currencie.map((cur, indexCur) => (
            <div key={index + "cur" + indexCur}>
              {getObjectOfArray(CurrienceOptions, cur)?.label}
            </div>
          ))
        )}
      </td>
      <td className={stylesPage["itemFields"]}>
        {loading ? (
          <Skeleton className={"skeleton-input"} />
        ) : (
          fields.map((field, indexFields) => (
            <div key={index + "field" + indexFields}>
              {field.title}
              {field.required && "*"}
            </div>
          ))
        )}
      </td>
      <td className={stylesPage["itemActions"]}>
        <ButtonComp
          icon={"pencil"}
          intent={"close-light-notML"}
          onClick={clickEditPS}
          loading={loading}
        />
        <ButtonComp
          icon={"trash"}
          intent={"close-light-notML"}
          className={"trashBtn"}
          onClick={onClickDeletePS}
          loading={loading}
        />
      </td>
    </tr>
  );
}
