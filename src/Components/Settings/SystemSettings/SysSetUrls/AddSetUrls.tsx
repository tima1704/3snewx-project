import { Dispatch, SetStateAction } from "react";
import { Collapse, Button, FormCheck } from "react-bootstrap";
import { InputComp } from "Components/MiniComponents";

import { SettingsApi } from "Helpers/api";
import { useAppDispatch, useAsyncSave } from "Hooks";

import { ESetUrls, ISetUrls } from "./types";

interface AddSetUrlsProps {
  editData?: ISetUrls;
  setEditData: Dispatch<SetStateAction<ISetUrls | undefined>>;
}

export default function AddSetUrls({ editData, setEditData }: AddSetUrlsProps) {
  const { fetchSetTrackingDomainUrl } = useAppDispatch();

  const clickCanselEdit = () => {
    setEditData(undefined);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key?: ESetUrls) => {
    if (editData) {
      setEditData({
        ...editData,
        [key || e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const { execute, disabled, errors } = useAsyncSave(
    SettingsApi.saveTrackingUrl,
    true
  );

  const onClickSaveTrackingUrl = () => {
    execute(editData).then(() => {
      fetchSetTrackingDomainUrl();
      clickCanselEdit();
    });
  };

  return (
    <Collapse in={editData ? true : false}>
      <div className={"spaceBlock32"}>
        <InputComp
          errors={errors}
          title={"URL link"}
          value={editData?.link}
          onChange={onChange}
          name={ESetUrls.link}
          disabled={disabled}
        />
        <InputComp errors={errors} name={ESetUrls.is_http}>
          <FormCheck
            label={"HTTP"}
            className={"checkbox"}
            id={"HTTP"}
            name={ESetUrls.is_http}
            onChange={onChange}
            disabled={disabled}
            checked={editData?.is_http}
          />
        </InputComp>
        <InputComp errors={errors} name={ESetUrls.is_https}>
          <FormCheck
            label={"HTTPS"}
            className={"checkbox"}
            id={"HTTPS"}
            name={ESetUrls.is_https}
            onChange={onChange}
            disabled={disabled}
            checked={editData?.is_https}
          />
        </InputComp>

        <div className={"btnRowFlexEnd"}>
          <Button
            variant={"danger"}
            onClick={clickCanselEdit}
            className={"btn-close"}
          >
            Cansel
          </Button>

          <Button onClick={onClickSaveTrackingUrl} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
