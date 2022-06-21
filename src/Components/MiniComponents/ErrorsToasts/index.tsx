import React from "react";
import { Toast } from "react-bootstrap";
import classNames from "classnames";

import Icon, { Icons } from "../Icon";
import { useAppDispatch } from "Hooks";

import styles from "./ErrorsToasts.module.css";

export type IntentToast =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

export interface IToast {
  messageHeader: string;
  icon?: Icons;
  intent?: IntentToast;
  debugInfo?: any;
}

interface ToastProps extends IToast {
  index: number;
}

function ToastComp({
  messageHeader,
  icon = "info",
  index,
  intent,
  debugInfo,
}: ToastProps) {
  const { deleteAppToastGlobal } = useAppDispatch();

  const onClose = () => {
    deleteAppToastGlobal(index);
  };

  return (
    <Toast
      bg={intent}
      autohide
      animation
      className={classNames(styles["toast"], intent)}
      onClose={onClose}
      delay={3000}
    >
      <Toast.Header className={styles["toastHeader"]}>
        <div className={styles["toastHeader"]}>
          <div className={styles["icon"]}>
            {icon && <Icon mr icon={icon} />}
          </div>
          <strong className="me-auto danger">{messageHeader}</strong>
          <div style={{ display: "none" }}>{debugInfo}</div>
        </div>
      </Toast.Header>
    </Toast>
  );
}

interface ErrorsProps {
  errors: IToast[];
}

export default function ErrorsToasts({ errors = [] }: ErrorsProps) {
  return (
    <div className={classNames(styles["toastsContainer"], "p-3")}>
      {errors.map((error, index: number) => (
        <ToastComp key={"error" + index} {...error} index={index} />
      ))}
    </div>
  );
}
