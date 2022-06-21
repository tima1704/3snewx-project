import { Dispatch, SetStateAction, useMemo } from "react";

import { ETrackingDomains, ITrackingDomains } from "./types";

import { Collapse, FormCheck, Button } from "react-bootstrap";
import { InputComp, InputTags } from "Components/MiniComponents";

import { ITag } from "Types";
import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";
import { SettingsApi } from "Helpers/api";

interface AddSysSetDomainsProps {
  editData?: ITrackingDomains;
  setEditData: Dispatch<SetStateAction<ITrackingDomains | undefined>>;
}

export default function AddSysSetDomains({
  editData,
  setEditData,
}: AddSysSetDomainsProps) {
  const trackingUrl = useAppSelector((state) => state.Settings.tracking_url);

  const { fetchSetTrackingDomainUrl } = useAppDispatch();

  const clickCanselEdit = () => {
    setEditData(undefined);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: ETrackingDomains
  ) => {
    if (editData) {
      setEditData({
        ...editData,
        [key || e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const onSelect = (tag: ITag, key: ETrackingDomains) => {
    if (editData) {
      setEditData({ ...editData, [key]: tag.value });
    }
  };

  const trackingUrlOptions = useMemo(() => {
    const initialValueOptions: ITag[] = [];

    if (trackingUrl) {
      trackingUrl.forEach((option) => {
        initialValueOptions.push({
          label: option.link,
          value: option.id?.toString() || option.type || "",
        });
      });
    }

    return initialValueOptions;
  }, [trackingUrl]);

  const { errors, execute, disabled } = useAsyncSave(
    SettingsApi.saveTrackingDomains,
    true
  );
  const onClickSaveDomain = () => {
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
          title={"Domain"}
          value={editData?.domain}
          onChange={onChange}
          name={ETrackingDomains.domain}
          disabled={disabled}
        />
        <InputComp
          errors={errors}
          title={"Domain type"}
          name={ETrackingDomains.domain_type}
        >
          <InputTags
            name={ETrackingDomains.domain_type}
            onChange={onSelect}
            isMulti={false}
            options={[
              { label: "3SNET", value: "3SNET" },
              { label: "Web", value: "web" },
            ]}
            disabled={disabled}
            value={editData?.domain_type}
          />
        </InputComp>
        <InputComp
          errors={errors}
          title={"Main Domain"}
          name={ETrackingDomains.main_domain}
        >
          <InputTags
            name={ETrackingDomains.main_domain}
            onChange={onSelect}
            options={trackingUrlOptions}
            isMulti={false}
            disabled={disabled}
            value={editData?.main_domain.toString()}
          />
        </InputComp>
        <InputComp errors={errors} name={ETrackingDomains.is_http}>
          <FormCheck
            label={"HTTP"}
            className={"checkbox"}
            id={"HTTP"}
            name={ETrackingDomains.is_http}
            onChange={onChange}
            checked={editData?.is_http}
            disabled={disabled}
          />
        </InputComp>
        <InputComp errors={errors} name={ETrackingDomains.is_https}>
          <FormCheck
            label={"HTTPS"}
            className={"checkbox"}
            id={"HTTPS"}
            name={ETrackingDomains.is_https}
            onChange={onChange}
            checked={editData?.is_https}
            disabled={disabled}
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
          <Button onClick={onClickSaveDomain} disabled={disabled}>
            Save
          </Button>
        </div>
      </div>
    </Collapse>
  );
}
