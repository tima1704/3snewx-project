import { Collapse, FormControl, Button } from "react-bootstrap";
import { ITag } from "Types";
import { InputComp, InputTags } from "Components/MiniComponents";

import { ICurrence } from "./types";

import OptionsStatusCurrence from "Data/Static/Settings/statusCurrence.json";
import React from "react";

import styles from "../Styles/addPage.module.css";
import { useAppDispatch, useAsyncSave } from "Hooks";
import { SettingsApi } from "Helpers/api";

interface AddCurrienceSettingsProps {
  editData?: ICurrence;
  setEditData: any;
}

export default function AddCurrienceSettings({
  editData,
  setEditData,
}: AddCurrienceSettingsProps) {
  const onSelect = (tag: ITag, key: string) => {
    setEditData({ ...editData, [key]: tag.value });
  };

  const clickCanselEditCurrence = () => {
    setEditData(undefined);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, minPayment: e.target.value });
  };

  const { fetchSetCurriences } = useAppDispatch();
  const { execute, disabled, errors } = useAsyncSave(
    SettingsApi.saveSttingsCurrence,
    true
  );

  const onClickSaveCurrence = () => {
    execute(editData).then(() => {
      fetchSetCurriences();
      setEditData();
    });
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <InputComp errors={errors} title={"Code"}>
          <div>{editData?.code}</div>
        </InputComp>

        <InputComp errors={errors} title={"Min Payment"}>
          <FormControl
            type={"number"}
            value={editData?.minPayment || 0}
            onChange={onChange}
            className={styles["numberImput"]}
            min={0}
            disabled={disabled}
          />
        </InputComp>

        <InputComp errors={errors} title={"Status"} name={"status"}>
          <InputTags
            options={OptionsStatusCurrence}
            value={editData?.status || ""}
            isClearable={false}
            isMulti={false}
            name={"status"}
            onChange={onSelect}
            disabled={disabled}
          />
        </InputComp>

        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={clickCanselEditCurrence}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button onClick={onClickSaveCurrence} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
