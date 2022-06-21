import React from "react";
import { Collapse, Button } from "react-bootstrap";
import {
  Line,
  InputComp,
  InputTags,
  ErrorInputMessage,
} from "Components/MiniComponents";

import OptionsDataType from "Data/Static/Settings/dataTypeEmail.json";
import OptionsProtocolEmail from "Data/Static/Settings/protocolEmail.json";

import { ITag } from "Types";

import { EnumEmail, ISettingsEmail } from "./Constants";
import { SettingsApi } from "Helpers/api";
import SendTestEmail from "./SendTestEmail";
import { useAppDispatch, useAsyncSave } from "Hooks";

import styles from "../Styles/index.module.css";

const initialDataEmail: ISettingsEmail = {
  protocol: "smtp_ssl",
  server: "",
  port: "",
  user: "",
  password: "",
};

interface AddEmailProps {
  editData?: ISettingsEmail;
  setEditData: any;
}

export default function AddEmail({ editData, setEditData }: AddEmailProps) {
  const { fetchSetEmail } = useAppDispatch();

  const onClickAddEmail = () => {
    setEditData(initialDataEmail);
  };

  const onClickCanselAddEmail = () => {
    setEditData(undefined);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: EnumEmail
  ) => {
    setEditData({
      ...editData,
      [key || e.target.name]: e.target.value,
    });
  };

  const onSelectTags = (tag: ITag, key: EnumEmail) => {
    setEditData({ ...editData, [key]: tag?.value });
  };

  const { errors, execute, disabled } = useAsyncSave(
    SettingsApi.saveSettingsEmail,
    true
  );

  const saveEmail = () => {
    if (editData) {
      execute(editData).then(() => {
        fetchSetEmail();
        setEditData();
      });
    }
  };

  return (
    <div>
      <div className={styles.btnSaveRow}>
        <Button onClick={onClickAddEmail} disabled={editData ? true : false}>
          Add new email settings
        </Button>
      </div>
      <Collapse in={editData ? true : false}>
        <div className={"spaceBlock32"}>
          <ErrorInputMessage
            errors={errors}
            inputName={"mail_server"}
            className={"spaceBlock32"}
          />
          <InputComp title={"Data type"} name={EnumEmail.type} errors={errors}>
            <InputTags
              options={OptionsDataType}
              onChange={onSelectTags}
              name={EnumEmail.type}
              isClearable
              isMulti={false}
              value={editData?.type}
              disabled={disabled}
            />
          </InputComp>

          <InputComp
            errors={errors}
            title={"Protocol"}
            name={EnumEmail.protocol}
          >
            <InputTags
              options={OptionsProtocolEmail}
              onChange={onSelectTags}
              name={EnumEmail.protocol}
              isMulti={false}
              value={editData?.protocol}
              disabled={disabled}
            />
          </InputComp>
          <InputComp
            title={"SMTP-server"}
            name={EnumEmail.server}
            errors={errors}
            onChange={onChange}
            value={editData?.server || ""}
            disabled={disabled}
          />
          <InputComp
            title={"SMTP-port"}
            name={EnumEmail.port}
            errors={errors}
            onChange={onChange}
            value={editData?.port || ""}
            disabled={disabled}
          />
          <InputComp
            title={"SMTP-login"}
            name={EnumEmail.user}
            errors={errors}
            onChange={onChange}
            value={editData?.user || ""}
            disabled={disabled}
          />
          <InputComp
            title={"SMTP-password"}
            name={EnumEmail.password}
            errors={errors}
            onChange={onChange}
            value={editData?.password || ""}
            disabled={disabled}
          />
          {editData?.id && <SendTestEmail id={editData.id} />}
          <div className={styles.btnSaveRow}>
            <Button onClick={saveEmail}>Save</Button>
            <Button
              className={styles.emailCloseBtn}
              variant={"danger"}
              onClick={onClickCanselAddEmail}
            >
              Close
            </Button>
          </div>
          <Line />
        </div>
      </Collapse>
    </div>
  );
}
