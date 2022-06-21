import { Redirect, Route, Switch } from "react-router";
import { URL_LOGIN } from "Constants/URLConstants/URLLogin";
import Login from "./Login";

export default function AuthPages() {
  return (
    <Switch>
      <Route path={URL_LOGIN} component={Login} exact />
      <Redirect to={URL_LOGIN} />
    </Switch>
  );
}
