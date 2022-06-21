import { Redirect, Route, Switch } from "react-router";
import TasksNewComp from "Components/Tasks/New";
import {
  //   URL_TASKS,
  //   URL_TASKS_EDIT_$ID,
  URL_TASKS_NEW,
} from "Constants/URLConstants/URLCabinet/URLTasks";

export default function TasksPages() {
  return (
    <Switch>
      {/* <Route path={URL_TASKS} component={TasksList} exact /> */}
      <Route path={URL_TASKS_NEW} component={TasksNewComp} exact />
      {/* <Route path={URL_TASKS_EDIT_$ID} component={TasksEdit} exact /> */}
      <Redirect to={URL_TASKS_NEW} />
      {/* ИЗМЕНИТЬ РЕДИРЕКТ */}
    </Switch>
  );
}
