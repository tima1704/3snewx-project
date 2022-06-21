import { useMemo } from "react";
import { Collapse } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAsyncSave, useLanguage } from "Hooks";
import {
  ErrorInputMessage,
  InputComp,
  SelectLang,
} from "Components/MiniComponents";

import { EMessenger, IMessengerEdit } from "./types";

interface AddCategoriesSettingsProps {
  editData?: IMessengerEdit;
  setEditData: any;
}

export default function AddMessengerSettings({
  setEditData,
  editData,
}: AddCategoriesSettingsProps) {
  const { languages, language, setLanguage } = useLanguage();
  const { errors, disabled, execute } = useAsyncSave(
    SettingsApi.saveSettingsMessenger,
    true
  );
  const { fetchSetMessenger } = useAppDispatch();

  const clickCanselEditMessenger = () => {
    if (setEditData) {
      setEditData();
    }
  };

  const value = useMemo(() => {
    if (editData?.[language]) {
      return editData[language].title;
    }
    return "";
  }, [editData, language]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: EMessenger
  ) => {
    if (editData) {
      setEditData({
        ...editData,
        [language]: {
          ...editData[language],
          [key || e.target.name]: e.target.value,
        },
      });
    }
  };

  const onClickSave = () => {
    execute(editData).then(() => {
      fetchSetMessenger();
      setEditData();
    });
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <SelectLang
          languages={languages}
          keyText={"addLang"}
          value={language}
          onSelect={setLanguage}
        />
        <ErrorInputMessage errors={errors} inputName={"category"} />
        <InputComp
          errors={errors}
          name={"title"}
          value={value}
          title={"Title"}
          disabled={disabled}
          onChange={onChange}
        />
        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={clickCanselEditMessenger}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button onClick={onClickSave} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
