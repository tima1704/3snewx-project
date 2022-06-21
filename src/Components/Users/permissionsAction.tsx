import { Form } from "react-bootstrap";
import { useAppDispatch } from "Hooks";
import { EPermissions } from "./permissionsItem";

export default function PermissionsAction({
  type,
  edit,
  name,
  permission,
  disabled,
  userId,
}: {
  type?: boolean;
  edit: boolean;
  name: string;
  permission: EPermissions;
  disabled: boolean;
  userId: string;
}) {
  const { onCheckedUserPermission } = useAppDispatch();

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedUserPermission(name, permission, e.target.checked, userId);
  };

  if (edit) {
    return (
      <>
        {typeof type === "undefined" ? (
          ""
        ) : (
          <Form.Check
            checked={type}
            className={"checkbox"}
            onChange={onChecked}
            disabled={disabled}
          />
        )}
      </>
    );
  }

  return (
    <>
      {typeof type === "undefined" ? (
        ""
      ) : type === true ? (
        <span className={"successMessage"}>Yes</span>
      ) : (
        <span className={"errorMessage"}>No</span>
      )}
    </>
  );
}
