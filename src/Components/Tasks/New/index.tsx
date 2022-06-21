import React from "react";

import classNames from "classnames";
import { useHistory } from "react-router";
import { URL_TASKS } from "Constants/URLConstants/URLCabinet";

import { Button, FormControl } from "react-bootstrap";
import {
  InputComp,
  DatePickerComp,
  InputTags,
} from "Components/MiniComponents";

import styles from "./TasksNewComp.module.css";

export default function TasksNewComp() {
  const router = useHistory();

  const onClickCansel = () => {
    router.push(URL_TASKS.URL_TASKS);
  };

  const onChangeDate = () => {};

  const onSelect = () => {};

  return (
    <div className={classNames(styles["main"], "wrapper")}>
      <h1 className={styles["title"]}>New Tasks</h1>
      <div className={"contnent-50p"}>
        <InputComp title={"Name"} errors={[]} />
        <InputComp title={"Description"} errors={[]}>
          <FormControl as={"textarea"} />
        </InputComp>
        <InputComp title={"Attach file"} errors={[]}>
          <div>file</div>
        </InputComp>
        <InputComp title={"Deadline"} errors={[]}>
          <DatePickerComp onChange={onChangeDate} value={new Date()} />
        </InputComp>
        <InputComp title={"Status"} errors={[]}>
          <InputTags isMulti={false} onChange={onSelect} name={""} />
        </InputComp>
        <InputComp title={"Priority"} errors={[]}>
          <InputTags isMulti={false} onChange={onSelect} name={""} />
        </InputComp>
        <InputComp title={"Type"} errors={[]}>
          <InputTags isMulti={false} onChange={onSelect} name={""} />
        </InputComp>
        <InputComp title={"Affiliate"} errors={[]}>
          <InputTags onChange={onSelect} name={""} />
        </InputComp>
        <InputComp title={"Assignee"} errors={[]}>
          <InputTags isMulti={false} onChange={onSelect} name={""} />
        </InputComp>
        <div className={styles["btnRow"]}>
          <div>
            <Button variant={"danger"} onClick={onClickCansel}>
              Cansel
            </Button>
          </div>
          <div>
            <Button className={styles["btnSave"]}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
