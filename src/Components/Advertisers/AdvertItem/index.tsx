import { IAdvertItem } from "../types";

import stylesTable from "Styles/table.module.css";
import ButtonComp from "Components/MiniComponents/ButtonComp";
import { Link } from "react-router-dom";
import { URL_ADVERTISERS, URL_USERS } from "Constants/URLConstants/URLCabinet";

export default function AdvertItem({
  id,
  company,
  contacts,
  offer_count,
  email,
  manager,
}: IAdvertItem) {
  return (
    <tr className={stylesTable["trTable"]}>
      <td>{id}</td>
      <td>{company}</td>
      <td>{id}</td>
      <td>{id}</td>
      <td>{email || "-"}</td>
      <td>
        {manager ? (
          <Link to={URL_USERS.URL_USER_ID_EDIT_GENERAL(manager.id)}>
            {manager.name}
          </Link>
        ) : (
          "-"
        )}
      </td>
      <td>{offer_count}</td>
      <td className={stylesTable["actionsTwo"]}>
        <Link to={URL_ADVERTISERS.URL_ADVERTISERS_EDIT(id, "primary-info")}>
          <ButtonComp icon={"pencil"} intent={"close-light-notML"} />
        </Link>
        <ButtonComp icon={"trash"} intent={"close-light"} />
      </td>
    </tr>
  );
}
