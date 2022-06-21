import React from "react";

import styles from "./Line.module.css";

import classNames from "classnames";

interface LineProps {
  className?: string;
}

export default function Line({ className = "" }: LineProps) {
  return (
    <div
      className={classNames(styles.line, {
        [className]: className,
      })}
    ></div>
  );
}
