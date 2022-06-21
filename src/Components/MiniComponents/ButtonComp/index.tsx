import React from "react";

import styles from "./index.module.css";

import classNames from "classnames";
import Icon, { IconProps } from "../Icon";

import Skeleton from "react-loading-skeleton";

interface ButtonCompProps {
  children?: React.ReactChildren;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: IconProps["icon"];
  iconClassName?: string;
  intent?: "" | "light" | "close-light" | "close-light-notML";
  className?: string;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function ButtonComp({
  children,
  icon,
  iconClassName,
  className = "",
  intent = "",
  text,
  onClick,
  style,
  loading,
  disabled,
}: ButtonCompProps) {
  if (loading) {
    return (
      <div
        className={classNames(styles["btnloding"], styles[intent], className)}
      >
        <Skeleton className={"skeleton-btn"} />
        {icon && <Icon icon={icon} className={styles["none"]} />}
      </div>
    );
  }

  return (
    <button
      className={classNames(styles["btn"], styles[intent], className)}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <>
        {icon && <Icon icon={icon} className={iconClassName} />}
        {children || text}
      </>
    </button>
  );
}
