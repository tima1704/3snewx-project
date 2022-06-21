import { Dispatch, SetStateAction } from "react";

import { ITrackingDomains } from "./types";

import { FormCheck } from "react-bootstrap";
import { ButtonComp } from "Components/MiniComponents";

import { animateScroll } from "react-scroll";

import Skeleton from "react-loading-skeleton";
import { getObjectOfArray } from "Helpers/CustomFunc";
import { useAppSelector } from "Hooks";

import stylesPage from "./SysSetDomains.module.css";
import stylesTable from "Styles/table.module.css";

interface ItemSysSetDomainsProps extends ITrackingDomains {
  loading?: boolean;

  setEditData: Dispatch<SetStateAction<ITrackingDomains | undefined>>;
}

export default function ItemSysSetDomains({
  id,
  domain,
  domain_type,
  is_https,
  is_http,
  main_domain,
  is_default,
  setEditData,
  loading,
}: ItemSysSetDomainsProps) {
  const trackingUrl = useAppSelector((state) => state.Settings.tracking_url);

  const onClickEdit = () => {
    animateScroll.scrollToTop();
    setEditData({
      id,
      domain,
      domain_type,
      is_https,
      is_http,
      main_domain,
      is_default,
    });
  };

  const onClickDelete = () => {};

  return (
    <tr className={stylesTable.trTable}>
      <td className={stylesPage["urlName"]}>
        {loading ? <Skeleton className={"skeleton-input"} /> : domain}
      </td>
      <td className={stylesPage["urlLink"]}>
        {loading ? <Skeleton className={"skeleton-input"} /> : domain_type}
      </td>
      <td className={stylesPage["urlLink"]}>
        {loading ? (
          <Skeleton className={"skeleton-input"} />
        ) : (
          getObjectOfArray(trackingUrl || [], main_domain, "id")?.link
        )}
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
          icon={is_default ? "check-fill" : "anchor"}
          intent={"close-light-notML"}
          onClick={onClickEdit}
          loading={loading}
        />
        <ButtonComp
          icon={"pencil"}
          intent={"close-light-notML"}
          onClick={onClickEdit}
          className={"trashBtn"}
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
