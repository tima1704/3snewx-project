import {
  URL_NEW_USER_GENERAL,
  URL_USER_$ID_AUTH_TOKEN,
  URL_USER_$ID_EDIT_GENERAL,
  URL_USER_$ID_EDIT_PERMISSIONS,
  URL_USER_ID_AUTH_TOKEN,
  URL_USER_ID_EDIT_GENERAL,
  URL_USER_ID_EDIT_PERMISSIONS,
} from "Constants/URLConstants/URLCabinet/URLUsers";

import { Redirect, Route, Switch, useParams } from "react-router";
import { NavigationTabs } from "Components/MiniComponents";
import AddEditUserGenaral from "./General";
import AddEditUserPermissions from "./Permissions";
import AuthTokents from "./AuthTokens";

import { useMemo } from "react";

import styles from "Styles/pagesStyles/users/index.module.css";

interface IParams {
  id: string;
}

export default function AddEditUser({
  newStatus = true,
}: {
  newStatus?: boolean;
}) {
  const id = useParams<IParams>().id;

  const NavBarItems = useMemo(
    () => [
      {
        title: "General",
        to: newStatus ? URL_NEW_USER_GENERAL : URL_USER_ID_EDIT_GENERAL(id),
        includes: newStatus
          ? URL_NEW_USER_GENERAL
          : URL_USER_ID_EDIT_GENERAL(id),
      },
      {
        title: "Permissions",
        to: newStatus ? URL_NEW_USER_GENERAL : URL_USER_ID_EDIT_PERMISSIONS(id),
        includes: newStatus ? "//" : URL_USER_ID_EDIT_PERMISSIONS(id),
      },
      {
        title: "AuthKeys",
        to: newStatus ? URL_NEW_USER_GENERAL : URL_USER_ID_AUTH_TOKEN(id),
        includes: newStatus ? "//" : URL_USER_ID_AUTH_TOKEN(id),
      },
    ],
    [newStatus, id]
  );

  return (
    <div className={"wrapper"}>
      <h1 className={styles["title"]}>
        {newStatus ? "New User" : `Edit user ${id}`}
      </h1>
      <div className={"contnent-50p"}>
        <NavigationTabs items={NavBarItems} />
      </div>
      <div>
        <Switch>
          {newStatus ? (
            <Route
              path={URL_NEW_USER_GENERAL}
              children={<AddEditUserGenaral newStatus={true} />}
              exact
            />
          ) : (
            <>
              <Route
                path={URL_USER_$ID_EDIT_PERMISSIONS}
                children={<AddEditUserPermissions id={id} />}
                exact
              />
              <Route
                path={URL_USER_$ID_EDIT_GENERAL}
                children={<AddEditUserGenaral newStatus={false} id={id} />}
                exact
              />
              <Route
                path={URL_USER_$ID_AUTH_TOKEN}
                children={<AuthTokents id={id} />}
                exact
              />
            </>
          )}

          <Redirect to={URL_NEW_USER_GENERAL} />
        </Switch>
      </div>
    </div>
  );
}
