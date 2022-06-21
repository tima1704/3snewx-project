import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  InputComp,
  ErrorInputMessage,
  InputTags,
} from "Components/MiniComponents";
import { Button } from "react-bootstrap";

import { initialDataUserGeneral, IUserGeneral } from "./types";
import { ITag } from "Types";

import { URL_USERS } from "Constants/URLConstants/URLCabinet/URLUsers";

import { useAsyncSave } from "Hooks";
import { UsersApi } from "Helpers/api";

import OptionsAdminStatus from "Data/Static/Users/adminStatus.json";

import styles from "Styles/pagesStyles/users/index.module.css";

interface AddEditUserGenaralProps {
  newStatus: boolean;
  id?: string;
}

export default function AddEditUserGenaral({
  newStatus = true,
  id,
}: AddEditUserGenaralProps) {
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const [editData, setEditData] = useState<IUserGeneral>(
    initialDataUserGeneral
  );

  const onSelect = (tag: ITag, key: string) => {
    setEditData({ ...editData, [key]: tag.value });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditData({ ...editData, [key]: e.target.value });
  };

  const fetchDataUser = useCallback((id: string) => {
    UsersApi.fetchUserById(id).then((res) => {
      const admin = res.data.admin;
      setEditData({
        email: admin.email,
        //   avatar: string;
        status: admin.status,
        firstName: admin.first_name,
        secondName: admin.second_name,
        skype: admin.skype,
        telegram: admin.telegram,
        phone: admin.phone,
        openingHours: admin.opening_hours,
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (newStatus) {
      setLoading(false);
    } else {
      if (id) {
        fetchDataUser(id);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStatus, id]);

  const { errors, execute, disabled } = useAsyncSave(
    UsersApi.userSaveAdmin,
    !newStatus
  );

  const onClickSaveAdmin = () => {
    execute(editData, id).then(() => {
      if (newStatus) {
        history.push(URL_USERS);
      } else {
        if (id) {
          fetchDataUser(id);
        }
      }
    });
  };

  return (
    <div className={"contnent-50p"}>
      <ErrorInputMessage errors={errors} inputName={"admin"} />
      <InputComp
        errors={errors}
        title={"Status"}
        name={"status"}
        loading={loading}
      >
        <InputTags
          name={"status"}
          onChange={onSelect}
          options={OptionsAdminStatus}
          isMulti={false}
          isClearable={false}
          value={editData.status}
          disabled={disabled}
        />
      </InputComp>
      <InputComp
        errors={errors}
        title={"Email"}
        name={"email"}
        onChange={onChange}
        value={editData.email}
        loading={loading}
        disabled={disabled}
      />
      {newStatus && (
        <InputComp
          errors={errors}
          title={"Password"}
          name={"plainPassword"}
          value={editData.plainPassword}
          onChange={onChange}
          loading={loading}
          disabled={disabled}
        />
      )}
      <InputComp
        errors={errors}
        title={"First Name"}
        name={"firstName"}
        onChange={onChange}
        value={editData.firstName}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title={"Last Name"}
        name={"secondName"}
        onChange={onChange}
        value={editData.secondName}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title={"IM/Skype"}
        name={"skype"}
        value={editData.skype}
        onChange={onChange}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title={"Telegram"}
        name={"telegram"}
        onChange={onChange}
        value={editData.telegram}
        loading={loading}
        disabled={disabled}
      />
      <InputComp
        errors={errors}
        title={"Phone Number"}
        name={"phone"}
        value={editData.phone}
        onChange={onChange}
        loading={loading}
        disabled={disabled}
      />
      {/* <InputComp errors={errors} title={"Sections"}></InputComp> */}
      <InputComp
        errors={errors}
        title={"Technical Support Hours"}
        name={"openingHours"}
        onChange={onChange}
        value={editData.openingHours}
        loading={loading}
        disabled={disabled}
      />

      <div className={styles["btnRow"]}>
        <Link to={URL_USERS}>
          <Button variant={"danger"} className={styles["btnCansel"]}>
            Cansel
          </Button>
        </Link>
        <Button
          disabled={disabled || loading}
          onClick={onClickSaveAdmin}
          className={styles["btnSave"]}
        >
          {newStatus ? "Create" : "Save"}
        </Button>
      </div>
    </div>
  );
}
