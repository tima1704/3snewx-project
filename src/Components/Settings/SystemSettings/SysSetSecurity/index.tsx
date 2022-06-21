import React, { useEffect, useState } from "react";

import { SettingsApi } from "Helpers/api";
import { generateCode, getObjectOfArray } from "Helpers/CustomFunc";
import { useAsyncSave } from "Hooks";

import { Form, Button } from "react-bootstrap";
import {
  CreatebleTags,
  InputComp,
  ErrorInputMessage,
} from "Components/MiniComponents";

import { ITag } from "Types";
import { ESecuritySet, initialSecuritySetData, ISecuritySet } from "./types";

import styles from "../Styles/index.module.css";

export default function SysSetSecurity() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ISecuritySet>(initialSecuritySetData);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: ESecuritySet
  ) => {
    setData({
      ...data,
      [key || e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const clickGenerateCode = () => {
    setData({ ...data, secure_postback_code: generateCode(32) });
  };

  const onSelectCreatebleTag = (tag: ITag | ITag[], name: ESecuritySet) => {
    if (tag) {
      if (Array.isArray(tag)) {
        return setData({ ...data, [name]: tag.map((item) => item.value) });
      } else {
        return setData({ ...data, [name]: tag.value });
      }
    }

    return setData({ ...data, [name]: tag });
  };

  useEffect(() => {
    SettingsApi.fetchSettingsSecurity().then(({ data }) => {
      setData(data.data);
      setLoading(false);
    });
  }, []);

  const { execute, disabled, errors } = useAsyncSave(
    SettingsApi.saveSettingsSecurity,
    true
  );

  const saveSecuritySettings = () => {
    execute(data);
  };

  return (
    <div className={styles["ContentWrapperPages"]}>
      <ErrorInputMessage
        errors={errors}
        inputName={"security"}
        className={"spaceBlock32"}
      />
      <InputComp
        title={"IP whitelist"}
        name={ESecuritySet.ip_whitelist}
        errors={errors}
        loading={loading}
      >
        <CreatebleTags
          isMulti
          isClearable
          value={data.ip_whitelist}
          onChange={onSelectCreatebleTag}
          name={ESecuritySet.ip_whitelist}
        />
      </InputComp>

      <InputComp
        title={"Secure postback code"}
        name={ESecuritySet.secure_postback_code}
        errors={errors}
        loading={loading}
      >
        <div className={styles.btnGenerateRow}>
          <Form.Control
            type="text"
            placeholder={"Secure postback code"}
            name={ESecuritySet.secure_postback_code}
            onChange={onChange}
            value={data.secure_postback_code || ""}
            disabled={disabled}
            isInvalid={
              getObjectOfArray(
                errors,
                ESecuritySet.secure_postback_code,
                "name"
              )
                ? true
                : false
            }
          />
          <Button
            className={styles.btnGenerateCode}
            onClick={clickGenerateCode}
            disabled={disabled}
          >
            Generate code
          </Button>
        </div>
      </InputComp>

      <div className={"spaceBlock32"}>
        <Form.Check
          type="checkbox"
          label={"Ignore secure code"}
          id={"ignoreSecureCode"}
          checked={data.ignore_secure_code}
          onChange={onChange}
          className={"checkbox"}
          name={ESecuritySet.ignore_secure_code}
          disabled={loading || disabled}
        />
        <ErrorInputMessage
          errors={errors}
          inputName={ESecuritySet.ignore_secure_code}
          className={"spaceBlock32"}
        />
      </div>

      <div className={"spaceBlock32"}>
        <Form.Check
          type="checkbox"
          label={"Enable IP and device check for user session"}
          id={"checkUserSessionIp"}
          checked={data.check_user_session_ip}
          onChange={onChange}
          className={"checkbox"}
          name={ESecuritySet.check_user_session_ip}
          disabled={loading || disabled}
        />
        <ErrorInputMessage
          errors={errors}
          inputName={ESecuritySet.check_user_session_ip}
          className={"spaceBlock32"}
        />
      </div>

      <div className={styles.btnSaveRow}>
        <Button onClick={saveSecuritySettings} disabled={disabled}>
          Save
        </Button>
      </div>
    </div>
  );
}
