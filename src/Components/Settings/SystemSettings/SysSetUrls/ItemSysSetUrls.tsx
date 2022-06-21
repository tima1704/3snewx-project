import { Dispatch, SetStateAction } from "react";

import { ButtonComp } from "Components/MiniComponents";
import { FormCheck } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import { ISetUrls } from "./types";

import { animateScroll } from "react-scroll";

import stylesPage from "./SysSetUrls.module.css";
import stylesTable from "Styles/table.module.css";

interface ItemSysSetUrlsProps extends ISetUrls {
  loading?: boolean;

  setEditData: Dispatch<SetStateAction<ISetUrls | undefined>>;
}

export default function ItemSysSetUrls({
  setEditData,
  loading,
  link,
  type,
  id,
  is_http,
  is_https,
}: ItemSysSetUrlsProps) {
  const onClickEdit = () => {
    animateScroll.scrollToTop();
    setEditData({ id, link, is_http, is_https, type });
  };

  const onClickDelete = () => {};

  return (
    <tr className={stylesTable.trTable}>
      <td className={stylesPage["urlName"]}>
        {loading ? <Skeleton className={"skeleton-input"} /> : type}
      </td>
      <td className={stylesPage["urlLink"]}>
        {loading ? <Skeleton className={"skeleton-input"} /> : link}
      </td>
      <td className={stylesPage["http"]}>
        <FormCheck
          className={"checkbox"}
          checked={is_http}
          readOnly
          disabled={loading}
        />
      </td>
      <td className={stylesPage["https"]}>
        <FormCheck
          className={"checkbox"}
          checked={is_https}
          readOnly
          disabled={loading}
        />
      </td>
      <td className={stylesPage["options"]}>
        <ButtonComp
          icon={"pencil"}
          intent={"close-light-notML"}
          onClick={onClickEdit}
          loading={loading}
        />
        <ButtonComp
          icon={"trash"}
          intent={"close-light-notML"}
          className={"trashBtn"}
          onClick={onClickDelete}
          loading={loading}
        />
      </td>
    </tr>
  );
}
