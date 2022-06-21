import { useMemo } from "react";

import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAsyncSave, useLanguage } from "Hooks";

import {
  InputComp,
  ErrorInputMessage,
  SelectLang,
} from "Components/MiniComponents";
import { Collapse, Button } from "react-bootstrap";

import { ETicketCategory, ITicketCategoryEdit } from "./types";

interface AddContSetTicketCategoriesProps {
  editData?: ITicketCategoryEdit;
  setEditData: any;
}

export default function AddContSetTicketCategories({
  setEditData,
  editData,
}: AddContSetTicketCategoriesProps) {
  const { languages, language, setLanguage } = useLanguage();
  const { errors, disabled, execute } = useAsyncSave(
    SettingsApi.saveSettingsTicketCategory,
    true
  );
  const { fetchSetTiketsCategories } = useAppDispatch();

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
    key?: ETicketCategory
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
    execute(editData)
      .then(() => {
        fetchSetTiketsCategories();
        setEditData();
      })
      .catch(() => {
        console.log("catch");
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
          <Button onClick={onClickSaveCategories}>Save</Button>
        </div>
      </div>
    </Collapse>
  );
}
