import React from "react";

import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAsyncSave } from "Hooks";

import { Collapse, Button } from "react-bootstrap";
import { InputComp, ErrorInputMessage } from "Components/MiniComponents";

import { ETagSettings, ITagSettings } from "./Types";

interface ContentSettingsAddTagProps {
  editData?: ITagSettings;
  setEditData: any;
}

export default function ContentSettingsAddTag({
  editData,
  setEditData,
}: ContentSettingsAddTagProps) {
  const { fetchSetTags } = useAppDispatch();

  const onClickCanselAddTag = () => {
    setEditData(undefined);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: ETagSettings
  ) => {
    setEditData({ ...editData, [key || e.target.name]: e.target.value });
  };

  const { errors, disabled, execute } = useAsyncSave(
    SettingsApi.saveSettingsTag,
    true
  );

  const clickSaveTag = () => {
    if (editData) {
      execute(editData).then(() => {
        fetchSetTags();
        setEditData();
      });
    }
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <ErrorInputMessage errors={errors} inputName={"tag"} />
        <InputComp
          errors={errors}
          name={ETagSettings.title}
          value={editData?.title}
          title={"Title"}
          onChange={onChange}
          disabled={disabled}
        />
        <InputComp
          errors={errors}
          name={ETagSettings.name}
          value={editData?.name}
          title={"Name"}
          onChange={onChange}
          disabled={disabled}
        />
        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={onClickCanselAddTag}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button onClick={clickSaveTag} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
