import { SetStateAction, useState } from "react";
import { useAppDispatch, useAsyncSave, useLanguage } from "Hooks";

import { Button, Collapse } from "react-bootstrap";
import {
  InputComp,
  ErrorInputMessage,
  SelectLang,
} from "Components/MiniComponents";

import { IDescriptionsTemplate } from "./types";

import styles from "../Styles/addPage.module.css";

// @ts-ignore:disable-next-line
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore:disable-next-line
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SettingsApi } from "Helpers/api";

interface AddEditOfferIDescriptionsTemplateTelplateProps {
  editData?: IDescriptionsTemplate;
  setEditData: (
    value: SetStateAction<IDescriptionsTemplate | undefined>
  ) => void;
}

export default function AddEditOfferIDescriptionsTemplateTelplate({
  editData,
  setEditData,
}: AddEditOfferIDescriptionsTemplateTelplateProps) {
  const [onFocus, SetFocus] = useState(false);
  const { languagesNotGeneral } = useLanguage();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: keyof IDescriptionsTemplate
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
    SettingsApi.saveSettingsOfferDescriptionsTemplate,
    editData?.id === "new" ? false : true
  );

  const { fetchSetOfferDescriptionsTemplate } = useAppDispatch();

  const onClickSave = () => {
    if (editData) {
      execute(editData).then(() => {
        fetchSetOfferDescriptionsTemplate();
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
        <ErrorInputMessage
          errors={errors}
          inputName={"offer_description_template"}
        />
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
