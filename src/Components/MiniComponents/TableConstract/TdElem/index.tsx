import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { TContentItem } from "../types";

import styles from "./index.module.css";

interface TdElemProps {
  onClick?: any;
  props: TContentItem;
}

export default function TdElem({ props, onClick }: TdElemProps) {
  if (typeof props === "string") {
    return <td className={styles["tdElem"]}>{props}</td>;
  }

  const onClickBreakLine = () => {
    if (onClick && props.type === "breakLine") {
      onClick(props.url);
    }
  };

  switch (props.type) {
    case "breakLine":
      return (
        <td
          onClick={onClickBreakLine}
          colSpan={props.col}
          className={classNames(styles["tdElem"], styles["tdTable"])}
        >
          {props.value}
        </td>
      );

    case "link":
      return (
        <td
          colSpan={props.col}
          className={classNames(styles["tdElem"], styles["tdLink"])}
        >
          <Link to={props.link}>{props.value}</Link>
        </td>
      );

    default:
      return (
        <td colSpan={props.col} className={styles["tdElem"]}>
          {props}
        </td>
      );
  }
}
