import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

import {
  InputComp,
  InputTags,
  ErrorInputMessage,
} from "Components/MiniComponents";

import { ITag } from "Types";
import {
  ETrafficbackSet,
  initialSetTrafficback,
  ITrafficbackSet,
} from "./types";

import { SettingsApi } from "Helpers/api";
import { useAsyncSave } from "Hooks";

import OptionsConversionStatus from "Data/Static/conversionStatus.json";

import styles from "../Styles/index.module.css";

export default function SysSetTrafficbackTab() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ITrafficbackSet>(initialSetTrafficback);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: ETrafficbackSet
  ) => {
    setData({
      ...data,
      [key || e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  useEffect(() => {
    SettingsApi.fetchSettingsTraficback()
      .then(({ data }) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const { execute, disabled, errors } = useAsyncSave(
    SettingsApi.saveSettingsTrafficBack,
    true
  );

  const saveTrafficback = () => {
    execute(data);
  };

  const onSelect = (tag: ITag, name: ETrafficbackSet) => {
    if (tag) {
      if (Array.isArray(tag)) {
        return setData({ ...data, [name]: tag.map((item) => item.value) });
      } else {
        return setData({ ...data, [name]: tag.value });
      }
    }

    return setData({ ...data, [name]: tag });
  };

  return (
    <div className={styles["ContentWrapperPages"]}>
      <ErrorInputMessage
        errors={errors}
        inputName={"trafficback"}
        className={"spaceBlock32"}
      />
      <InputComp
        title={"Global Trafficback URL"}
        name={ETrafficbackSet.global_trafficback_url}
        errors={errors}
        value={data.global_trafficback_url}
        onChange={onChange}
        loading={loading}
        disabled={disabled}
      />

      <div className={"spaceBlock32"}>
        <Form.Check
          type="checkbox"
          label={"Use for disabled offers"}
          id={"useForDisabledOffers"}
          checked={data.use_for_disabled_offers}
          name={ETrafficbackSet.use_for_disabled_offers}
          onChange={onChange}
          className={"checkbox"}
          disabled={loading || disabled}
        />
        <ErrorInputMessage
          errors={errors}
          inputName={ETrafficbackSet.use_for_disabled_offers}
          className={"spaceBlock32"}
        />
      </div>

      <div className={"spaceBlock32"}>
        <Form.Check
          type="checkbox"
          label={"Use by other reasons"}
          id={"useByOtherReasons"}
          checked={data.use_by_other_reasons}
          onChange={onChange}
          name={ETrafficbackSet.use_by_other_reasons}
          className={"checkbox"}
          disabled={loading || disabled}
        />
        <ErrorInputMessage
          errors={errors}
          inputName={ETrafficbackSet.use_by_other_reasons}
          className={"spaceBlock32"}
        />
      </div>

      <InputComp
        title={"Conversion status for caps count"}
        name={ETrafficbackSet.conversion_status_for_caps_count}
        errors={errors}
        loading={loading}
        disabled={disabled}
      >
        <InputTags
          isMulti
          isClearable
          onChange={onSelect}
          name={ETrafficbackSet.conversion_status_for_caps_count}
          options={OptionsConversionStatus}
          value={data.conversion_status_for_caps_count}
          disabled={disabled}
        />
      </InputComp>

      <div className={"spaceBlock32"}>
        <Form.Check
          type="checkbox"
          label={"Use trafficback over caps"}
          id={"trafficbackOvercaps"}
          checked={data.trafficback_over_caps}
          onChange={onChange}
          className={"checkbox"}
          name={ETrafficbackSet.trafficback_over_caps}
          disabled={loading || disabled}
        />
        <ErrorInputMessage
          errors={errors}
          inputName={ETrafficbackSet.trafficback_over_caps}
          className={"spaceBlock32"}
        />
      </div>

      <div className={styles.btnSaveRow}>
        <Button onClick={saveTrafficback} disabled={disabled}>
          Save
        </Button>
      </div>
    </div>
  );
}
