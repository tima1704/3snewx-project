import { Redirect, Route, Switch } from "react-router";
import {
  URL_NEW_USER,
  URL_USERS,
  URL_USER_$ID_EDIT,
} from "Constants/URLConstants/URLCabinet/URLUsers";

import AddEditUser from "./AddEditUser";
import UsersList from "./UserList";

export default function UsersPages() {
  return (
    <Switch>
      <Route path={URL_USERS} component={UsersList} exact />
      <Route path={URL_NEW_USER} component={AddEditUser} />
      <Route
        path={URL_USER_$ID_EDIT}
        children={<AddEditUser newStatus={false} />}
      />

      <Redirect to={URL_USERS} />
    </Switch>
  );
}
