import { Dispatch, SetStateAction, useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import { SettingsApi } from "Helpers/api";
import { useAsyncSave, useLanguage } from "Hooks";
import { InputComp, InputTags, SelectLang } from "Components/MiniComponents";

import styles from "../Styles/addPage.module.css";
import { EEmailTemplates, IEmailTemplatesEdit } from "./types";

import OptionStatusEmailTemplates from "Data/Static/Status.json";
import { ITag } from "Types";

// @ts-ignore:disable-next-line
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore:disable-next-line
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface AddEmailTemplatesProps {
  editData?: IEmailTemplatesEdit;
  setEditData: Dispatch<SetStateAction<IEmailTemplatesEdit | undefined>>;
}

export default function AddEmailTemplates({
  editData,
  setEditData,
}: AddEmailTemplatesProps) {
  const { language, languagesNotGeneral, setLanguage } = useLanguage("eng");

  const { errors, disabled } = useAsyncSave(
    SettingsApi.saveSettingsCategories,
    true
  );

  const [onFocus, SetFocus] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: EEmailTemplates
  ) => {
    if (editData?.[language]) {
      setEditData({
        ...editData,
        [language]: {
          ...editData?.[language],
          template: {
            ...editData[language].template,
            [key || e.target.name]: e.target.value,
          },
        },
      });
    }
  };

  const onSelectAdd = (e: ITag) => {
    if (editData) {
      setEditData({
        ...editData,
        [language]: {
          ...editData[language],
          template: { ...editData[language].template, status: e.value },
        },
      });
    }
  };

  const onChangeBody = (value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        [language]: {
          ...editData[language],
          template: {
            ...editData[language].template,
            [EEmailTemplates.body]: value,
          },
        },
      });
    }
  };

  const onClickCansel = () => {
    setEditData(undefined);
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <SelectLang
          languages={languagesNotGeneral}
          onSelect={setLanguage}
          value={language}
        />
        <div className={styles.rowInput}>
          <InputComp
            title={"Title"}
            name={EEmailTemplates.title}
            errors={errors}
            classNameBlock={styles.blockInput}
            onChange={onChange}
            value={editData?.[language]?.template?.title}
            disabled={disabled}
          />
        </div>
        <div className={styles.rowInput}>
          <InputComp
            title={"Subject"}
            name={EEmailTemplates.subject}
            errors={errors}
            classNameBlock={styles.blockInput}
            onChange={onChange}
            value={editData?.[language]?.template?.subject}
            disabled={disabled}
          />
        </div>
        <div className={styles.rowInput}>
          <InputComp
            title={"Letter body"}
            name={EEmailTemplates.body}
            errors={errors}
            classNameBlock={styles.blockInput}
          >
            <div className={styles.blockInputTextArea}>
              <CKEditor
                editor={ClassicEditor}
                data={editData?.[language]?.template?.body || ""}
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
          <div className={styles.blockInfo}>
            <p>*Note - you can use this parameters in template:</p>
            <div>
              <span>tickets_url</span> - Link to ticket list
            </div>
            <div>
              <span>offer_title</span> - Offer title
            </div>
            <div>
              <span>site_title</span> - Site title
            </div>
            <div>
              <span>offer_id</span> - Offer id
            </div>
          </div>
        </div>

        <div className={styles.rowInput}>
          <InputComp
            title={"Status"}
            name={"status"}
            errors={errors}
            classNameBlock={styles.blockInput}
          >
            <InputTags
              isMulti={false}
              options={OptionStatusEmailTemplates}
              className={styles.blockInputSelect}
              onChange={onSelectAdd}
              name={"status"}
              value={editData?.[language]?.template?.status}
              disabled={disabled}
            />
          </InputComp>
        </div>

        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={onClickCansel}
            className={"btn-close"}
          >
            Cansel
          </Button>
          <Button
          // onClick={clickSaveCategories}
          >
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
