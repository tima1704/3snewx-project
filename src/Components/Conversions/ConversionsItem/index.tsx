import { IConversions } from "../types";

import { ITableColumn } from "..";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAppDispatch, useAsyncSave } from "Hooks";
import { ConversionsApi } from "Helpers/api";

import {
  URL_OFFER,
  URL_PARTNERS,
  URL_ADVERTISERS,
} from "Constants/URLConstants/URLCabinet";

import styles from "Styles/table.module.css";
import stylesPage from "../index.module.css";

interface ConversionsItemProps {
  TableColumnFilter: ITableColumn[];
  props: IConversions;
  index: number;
}

export default function ConversionsItem({
  TableColumnFilter,
  props,
  index,
}: ConversionsItemProps) {
  const { fetchConversionsList } = useAppDispatch();
  const { execute, disabled } = useAsyncSave(
    ConversionsApi.aproveDeclineConversion,
    true
  );

  const onClickDecline = () => {
    execute(props.id, "decline").then(() => {
      fetchConversionsList();
    });
  };
  const onClickAprove = () => {
    execute(props.id, "approve").then(() => {
      fetchConversionsList();
    });
  };

  return (
    <tr className={styles.trTable}>
      {TableColumnFilter.map((itemTd, indexTd) => (
        <TdItemConversions
          keyId={itemTd.id}
          value={props[itemTd.id]}
          key={index + itemTd.id + "tdItem" + indexTd}
        />
      ))}
      <td className={stylesPage["btnActions"]}>
        <Button
          onClick={onClickDecline}
          disabled={disabled}
          variant="danger"
          className={stylesPage["btnDecline"]}
        >
          Decline
        </Button>
        <Button onClick={onClickAprove} disabled={disabled}>
          Approve
        </Button>
      </td>
    </tr>
  );
}

interface TdItemConversionsProps {
  keyId: keyof IConversions;
  value: any;
}

function TdItemConversions({ keyId, value }: TdItemConversionsProps) {
  switch (keyId) {
    case "is_paid":
      return <td>{value ? "Yes" : "No"}</td>;

    case "offer":
      return (
        <td>
          <Link to={URL_OFFER.URL_OFFER_CARD_ID(value.id)}>
            {value.id + " " + value.title}
          </Link>
        </td>
      );

    case "advert":
      return (
        <td>
          <Link to={URL_ADVERTISERS.URL_ADVERTISERS_EDIT(value.id)}>
            {value.id + " " + value.title}
          </Link>
        </td>
      );

    case "affiliate":
      return (
        <td>
          <Link to={URL_PARTNERS.URL_PARTNERS_MANAGMENT_AFFILIATES(value.id)}>
            {value.id + " " + value.title}
          </Link>
        </td>
      );

    default:
      return <td>{value}</td>;
  }
}
