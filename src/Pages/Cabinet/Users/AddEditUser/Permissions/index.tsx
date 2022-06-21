import { useEffect, useMemo, useState } from "react";

import { Button } from "react-bootstrap";
import { SpinnerLogo } from "Components/MiniComponents";
import PermissionsItem from "Components/Users/permissionsItem";

import { saveUserPermissions } from "Helpers/api/Users";
import { useAppDispatch, useAppSelector, useAsyncSave } from "Hooks";

import stylesTable from "Styles/table.module.css";

interface AddEditUserPermissionsProps {
  id: string;
}

export default function AddEditUserPermissions({
  id,
}: AddEditUserPermissionsProps) {
  const { fetchUserPermissionAction } = useAppDispatch();

  const objectPermissions = useAppSelector(
    (state) => state.Users.activeUser[id]?.permissions
  );

  useEffect(() => {
    fetchUserPermissionAction(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const listPermissions = useMemo(
    () => (objectPermissions ? Object.entries(objectPermissions) : []),
    [objectPermissions]
  );

  const { execute, disabled } = useAsyncSave(saveUserPermissions, true);

  const onClickSavePermissions = () => {
    execute(id, objectPermissions).then((res) => {
      fetchUserPermissionAction(id);
      setEdit(false);
    });
  };

  const [edit, setEdit] = useState(false);

  const onCickEdit = () => {
    setEdit(true);
  };

  return (
    <div className={"contnent-70p"}>
      <div>
        {edit ? (
          <Button onClick={onClickSavePermissions} disabled={disabled}>
            Save
          </Button>
        ) : (
          <Button onClick={onCickEdit}>Edit</Button>
        )}
      </div>
      <table className={stylesTable["table"]}>
        <thead className={stylesTable["headerTable"]}>
          <tr>
            <th>Section / Actions</th>
            <th>View</th>
            <th>Data export</th>
            <th>Creation</th>
            <th>Editing all entities</th>
            <th>Delete all entities</th>
          </tr>
        </thead>
        <tbody>
          {listPermissions?.map(([key, actions], index) => (
            <PermissionsItem
              key={key + "userpermissions" + index}
              {...actions}
              name={key}
              editItem={edit}
              disabled={disabled}
              userId={id}
            />
          ))}
        </tbody>
      </table>
      {listPermissions.length === 0 && <SpinnerLogo />}
      {edit ? (
        <Button onClick={onClickSavePermissions} disabled={disabled}>
          Save
        </Button>
      ) : (
        <Button onClick={onCickEdit}>Edit</Button>
      )}
    </div>
  );
}
