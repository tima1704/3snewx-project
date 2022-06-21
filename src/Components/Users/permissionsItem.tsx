import stylesTable from "Styles/table.module.css";
import PermissionsAction from "./permissionsAction";

interface PermissionsItemProps {
  userId: string;
  name: string;
  view?: boolean;
  export?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  editItem: boolean;
  disabled: boolean;
}

export enum EPermissions {
  view = "view",
  export = "export",
  create = "create",
  edit = "edit",
  delete = "delete",
}

export default function PermissionsItem({
  name,
  editItem,
  disabled,
  userId,
  ...actions
}: PermissionsItemProps) {
  return (
    <tr className={stylesTable["trTable"]}>
      <td style={{ textTransform: "capitalize" }}>
        {name.replaceAll("_", " ")}
      </td>
      <td>
        <PermissionsAction
          type={actions.view}
          edit={editItem}
          name={name}
          permission={EPermissions.view}
          disabled={disabled}
          userId={userId}
        />
      </td>
      <td>
        <PermissionsAction
          type={actions.export}
          edit={editItem}
          name={name}
          disabled={disabled}
          permission={EPermissions.export}
          userId={userId}
        />
      </td>
      <td>
        <PermissionsAction
          type={actions.create}
          edit={editItem}
          name={name}
          disabled={disabled}
          permission={EPermissions.create}
          userId={userId}
        />
      </td>
      <td>
        <PermissionsAction
          type={actions.edit}
          edit={editItem}
          name={name}
          disabled={disabled}
          permission={EPermissions.edit}
          userId={userId}
        />
      </td>
      <td>
        <PermissionsAction
          type={actions.delete}
          edit={editItem}
          name={name}
          disabled={disabled}
          permission={EPermissions.delete}
          userId={userId}
        />
      </td>
    </tr>
  );
}
