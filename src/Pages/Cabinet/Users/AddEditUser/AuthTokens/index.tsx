import React, { useEffect } from "react";

import { SpinnerLogo, ButtonComp } from "Components/MiniComponents";

import { UsersApi } from "Helpers/api";
import { useAppDispatch, useAppSelector } from "Hooks";

import stylesTable from "Styles/table.module.css";

interface AuthTokentsProps {
  id: string;
}

export default function AuthTokents({ id }: AuthTokentsProps) {
  const { fetchAuthTokens, addAppToastSuccess } = useAppDispatch();

  const list = useAppSelector(
    (state) => state.Users.activeUser[id]?.authTokens
  );

  useEffect(() => {
    fetchAuthTokens(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onClickDeleteToken = (token: string) => {
    UsersApi.deleteTokenUser(token).then(() => {
      fetchAuthTokens(id);
      addAppToastSuccess("Success Delete");
    });
  };

  return (
    <div>
      <table className={stylesTable["table"]}>
        <thead className={stylesTable["headerTable"]}>
          <tr>
            <th>Token</th>
            <th>Ip</th>
            <th>Devices</th>
            <th>Created</th>
            <th className={stylesTable["actionsOne"]}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((auth, index) => (
            <tr
              className={stylesTable["trTable"]}
              key={auth.id + "auth" + index}
            >
              <td>{auth.id}</td>
              <td>{auth.ip}</td>
              <td>{auth.ua}</td>
              <td>{auth.createdAt}</td>
              <td className={stylesTable["actionsTwo"]}>
                <ButtonComp
                  intent={"close-light-notML"}
                  icon={"power-red"}
                  onClick={() => {
                    onClickDeleteToken(auth.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!list && <SpinnerLogo />}
    </div>
  );
}
