import { SetStateAction, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useAppDispatch, useAsyncSave, useLanguage } from "Hooks";

import {
  InputComp,
  SelectLang,
  ErrorInputMessage,
} from "Components/MiniComponents";

import { IGoalTemplate } from "./types";

import styles from "../Styles/addPage.module.css";

// @ts-ignore:disable-next-line
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore:disable-next-line
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SettingsApi } from "Helpers/api";

interface AddEditOfferGoalTelplateProps {
  editData?: IGoalTemplate;
  setEditData: (value: SetStateAction<IGoalTemplate | undefined>) => void;
}

export default function AddEditOfferGoalTelplate({
  editData,
  setEditData,
}: AddEditOfferGoalTelplateProps) {
  const [onFocus, SetFocus] = useState(false);
  const { languagesNotGeneral } = useLanguage();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: keyof IGoalTemplate
  ) => {
    if (editData) {
      setEditData({
        ...editData,
        [key || e.target.name]: e.target.value,
      });
    }
  };

  const onClickCansel = () => {
    setEditData(undefined);
  };

  const onChangeBody = (value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        text: value,
      });
    }
  };

  const { execute, disabled, errors } = useAsyncSave(
    SettingsApi.saveSettingsOfferGoalTemplate,
    editData?.id === "new" ? false : true
  );

  const { fetchSetOfferGoalTemplate } = useAppDispatch();

  const onClickSave = () => {
    if (editData) {
      execute(editData).then(() => {
        fetchSetOfferGoalTemplate();
        onClickCansel();
      });
    }
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <SelectLang
          languages={languagesNotGeneral}
          value={editData?.lang || ""}
          onSelect={() => {}}
        />
        <ErrorInputMessage errors={errors} inputName={"offer_goal_template"} />
        <InputComp
          errors={errors}
          name={"title"}
          value={editData?.title}
          title={"Title"}
          disabled={disabled}
          onChange={onChange}
        />
        <InputComp
          title={"Text"}
          name={"text"}
          errors={errors}
          classNameBlock={styles.blockInput}
        >
          <div className={styles.blockInputTextArea}>
            <CKEditor
              editor={ClassicEditor}
              data={editData?.text || ""}
              onChange={(event: any, editor: any) => {
                if (onFocus) {
                  const data = editor.getData();
                  onChangeBody(data);
                }
              }}
              disabled={disabled}
              onFocus={() => {
                SetFocus(true);
              }}
              onBlur={() => {
                SetFocus(false);
              }}
              className={styles.blockInputTextArea}
            />
          </div>
        </InputComp>
        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={onClickCansel}
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
