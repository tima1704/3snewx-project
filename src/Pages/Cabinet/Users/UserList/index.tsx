import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ButtonComp, SpinnerLogo } from "Components/MiniComponents";

import {
  URL_NEW_USER,
  URL_USER_ID_EDIT_GENERAL,
} from "Constants/URLConstants/URLCabinet/URLUsers";

import { UsersApi } from "Helpers/api";

import { useAppDispatch, useAppSelector } from "Hooks";

import stylesTable from "Styles/table.module.css";

export default function UsersList() {
  const [loading, setLoading] = useState(true);
  const { fetchUSersListAction } = useAppDispatch();

  const list = useAppSelector((state) => state.Users.list);

  useEffect(() => {
    fetchUSersListAction(setLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDeleteUser = (userId: string) => {
    UsersApi.deleteUserById(userId).then(() => {
      fetchUSersListAction();
    });
  };

  return (
    <div className={"wrapper"}>
      <div className={"spaceBlock32"}>
        <Link to={URL_NEW_USER}>
          <Button>+ Add new User</Button>
        </Link>
      </div>
      <table className={stylesTable["table"]}>
        <thead className={stylesTable["headerTable"]}>
          <tr>
            <th>Status</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>IM/Skype</th>
            <th>Last day Login</th>
            <th className={stylesTable["actionsTwo"]}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            list.map((user, index) => (
              <tr
                className={stylesTable["trTable"]}
                key={user.id + "user" + index}
              >
                <td>{user.status}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.second_name}</td>
                <td>{user.skype}</td>
                <td>{user.last_login_dt}</td>
                <td className={stylesTable["actionsTwo"]}>
                  <Link to={URL_USER_ID_EDIT_GENERAL(user.id)}>
                    <ButtonComp intent={"close-light-notML"} icon={"pencil"} />
                  </Link>
                  <ButtonComp
                    intent={"close-light"}
                    icon={"trash"}
                    onClick={() => {
                      onClickDeleteUser(user.id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && <SpinnerLogo />}
    </div>
  );
}
