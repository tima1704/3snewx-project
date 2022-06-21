import { useEffect, useState } from "react";

import { ITag } from "Types";
import {
  InputTags,
  ErrorInputMessage,
  InputComp,
} from "Components/MiniComponents";
import { FormCheck, Button } from "react-bootstrap";

import { EGeneralData, IGeneralData, initialDataGeneralSet } from "./types";
import { SettingsApi } from "Helpers/api";

import OptionsLanguage from "Data/Static/language.json";
import OptionsTimeZone from "Data/Static/timezoneUTC.json";
import OptionsCountry from "Data/Static/country.json";

import { useAsyncSave } from "Hooks";

import styles from "../Styles/index.module.css";

export default function SysSetGeneralTab() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IGeneralData>(initialDataGeneralSet);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: EGeneralData
  ) => {
    setData({
      ...data,
      [key || e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const onSelectTags = (tag: ITag, key: EGeneralData) => {
    setData({ ...data, [key]: tag?.value });
  };

  useEffect(() => {
    SettingsApi.fetchSettingsGeneral().then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }, []);

  const { execute, errors, disabled } = useAsyncSave(
    SettingsApi.saveSettingsGeneral,
    true
  );

  const onClickSaveSettings = () => {
    execute(data);
  };

  return (
    <div className={styles["ContentWrapperPages"]}>
      <ErrorInputMessage
        errors={errors}
        inputName={"setting_general"}
        className={"spaceBlock32"}
      />
      <InputComp
        errors={errors}
        title={"Site name"}
        name={EGeneralData.site_name}
        onChange={onChange}
        value={data.site_name}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        title={"Legal address"}
        name={EGeneralData.domain}
        onChange={onChange}
        value={data.domain}
        errors={errors}
        loading={loading}
        disabled={disabled}
      />

      <InputComp
        title={"Admin panel default language"}
        name={EGeneralData.default_language}
        errors={errors}
        loading={loading}
      >
        <InputTags
          isMulti={false}
          isClearable={true}
          onChange={onSelectTags}
          name={EGeneralData.default_language}
          value={data.default_language}
          options={OptionsLanguage}
          disabled={disabled}
        />
      </InputComp>
      <InputComp
        title={"Timezone"}
        name={EGeneralData.timezone}
        errors={errors}
        loading={loading}
      >
        <InputTags
          isMulti={false}
          isClearable={true}
          onChange={onSelectTags}
          name={EGeneralData.timezone}
          value={data.timezone}
          options={OptionsTimeZone}
          disabled={disabled}
        />
      </InputComp>
      <InputComp
        title={"Country"}
        name={EGeneralData.country}
        errors={errors}
        loading={loading}
      >
        <InputTags
          isMulti={false}
          isClearable={true}
          onChange={onSelectTags}
          name={EGeneralData.country}
          value={data.country}
          options={OptionsCountry}
          disabled={disabled}
        />
      </InputComp>
      <InputComp
        title={"City"}
        name={EGeneralData.city}
        onChange={onChange}
        value={data.city}
        errors={errors}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        title={"Zip/postal code"}
        name={EGeneralData.zip_code}
        onChange={onChange}
        value={data.zip_code}
        errors={errors}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        title={"Tel"}
        name={EGeneralData.phone}
        onChange={onChange}
        value={data.phone}
        errors={errors}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        title={"Email"}
        name={EGeneralData.email}
        onChange={onChange}
        value={data.email}
        errors={errors}
        loading={loading}
        disabled={disabled}
      />
      <FormCheck
        type="checkbox"
        label={"Show commentator name"}
        id={"showCommentatorName"}
        checked={data.show_commentator_name}
        name={EGeneralData.show_commentator_name}
        onChange={onChange}
        className={"checkbox"}
        disabled={loading || disabled}
      />
      <ErrorInputMessage
        errors={errors}
        inputName={"showCommentatorName"}
        className={"spaceBlock32"}
      />
      <div className={styles.btnSaveRow}>
        <Button onClick={onClickSaveSettings} disabled={disabled || loading}>
          Save
        </Button>
      </div>
    </div>
  );
}
