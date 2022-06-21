import { useMemo } from "react";
import { Collapse } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAsyncSave, useLanguage } from "Hooks";
import {
  InputComp,
  SelectLang,
  ErrorInputMessage,
} from "Components/MiniComponents";
import { ECategory, ICategoryEdit } from "./types";

interface AddCategoriesSettingsProps {
  editData?: ICategoryEdit;
  setEditData: any;
}

export default function AddCategoriesSettings({
  setEditData,
  editData,
}: AddCategoriesSettingsProps) {
  const { languages, language, setLanguage } = useLanguage();
  const { errors, disabled, execute } = useAsyncSave(
    SettingsApi.saveSettingsCategories,
    true
  );
  const { fetchSetCategories } = useAppDispatch();

  const clickCanselEditCategory = () => {
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

  const onChangeAddCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: ECategory
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

  const onClickSaveCategories = () => {
    execute(editData).then(() => {
      fetchSetCategories();
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
          onChange={onChangeAddCategory}
        />
        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={clickCanselEditCategory}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button onClick={onClickSaveCategories} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
