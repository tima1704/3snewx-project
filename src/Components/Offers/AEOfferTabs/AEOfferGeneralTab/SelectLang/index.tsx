import { useState } from "react";

import { Button } from "react-bootstrap";
import { useLanguage } from "Hooks";

import { SelectLang, InputTags } from "Components/MiniComponents";

// @ts-ignore:disable-next-line
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore:disable-next-line
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Skeleton from "react-loading-skeleton";

interface SelectLangGeneralProps {
  value?: { [key: string]: string };
  onChange: any;
  name: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function SelectLangGeneral({
  value,
  onChange,
  name,
  disabled,
  loading,
}: SelectLangGeneralProps) {
  const { language, languagesNotGeneral, setLanguage } = useLanguage("eng");

  const onChangeLanguageForm = (value: string) => {
    onChange(value, language, name);
  };

  const [onFocus, SetFocus] = useState(false);

  return (
    <div>
      <SelectLang
        languages={languagesNotGeneral}
        onSelect={setLanguage}
        value={language}
        keyText={name}
      />

      <div>
        {!loading ? (
          <InputTags
            value={[]}
            name={"a"}
            isMulti={false}
            onChange={() => {}}
            className={"spaceBlock32"}
            disabled={disabled}
          />
        ) : (
          <Skeleton className={"spaceBlock32 skeleton-input"} />
        )}

        {!loading ? (
          // <Form.Control
          //   as="textarea"
          //   value={value?.[language] || ""}
          //   onChange={onChangeLanguageForm}
          //   className={"spaceBlock20"}
          //   name={name}
          //   disabled={disabled}
          // />
          <div className={"spaceBlock20"}>
            <CKEditor
              editor={ClassicEditor}
              data={value?.[language] || ""}
              onChange={(event: any, editor: any) => {
                if (onFocus) {
                  const data = editor.getData();
                  onChangeLanguageForm(data);
                }
              }}
              disabled={disabled}
              onFocus={() => {
                SetFocus(true);
              }}
              onBlur={() => {
                SetFocus(false);
              }}
            />
          </div>
        ) : (
          <Skeleton className={"spaceBlock20 skeleton-textarea"} />
        )}

        <div className="text-right">
          <Button variant="outline-secondary" disabled={loading || disabled}>
            Save as Template
          </Button>
        </div>
      </div>
    </div>
  );
}
