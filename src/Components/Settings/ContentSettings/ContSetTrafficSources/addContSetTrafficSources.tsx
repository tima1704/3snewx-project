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

import { ETrafficSources, ITrafficSourcesEdit } from "./types";

interface AddContSetTrafficSourcesProps {
  editData?: ITrafficSourcesEdit;
  setEditData: any;
}

export default function AddContSetTrafficSources({
  editData,
  setEditData,
}: AddContSetTrafficSourcesProps) {
  const { language, languages, setLanguage } = useLanguage();
  const { disabled, errors, execute } = useAsyncSave(
    SettingsApi.saveSettingsTrafficSources,
    true
  );
  const { fetchSetTrafficSources } = useAppDispatch();

  const clickCanselEdit = () => {
    setEditData();
  };

  const value = useMemo(() => {
    if (editData?.[language]) {
      return editData[language].title;
    }
    return "";
  }, [editData, language]);

  const saveTrafficSurces = () => {
    execute(editData)
      .then(() => {
        fetchSetTrafficSources();
        setEditData();
      })
      .catch(() => {});
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: ETrafficSources
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

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <SelectLang
          languages={languages}
          keyText={"addLang"}
          value={language}
          onSelect={setLanguage}
        />
        <ErrorInputMessage errors={errors} inputName={"trafficSources"} />
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
            onClick={clickCanselEdit}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button onClick={saveTrafficSurces} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
