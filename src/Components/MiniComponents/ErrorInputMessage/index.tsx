import classNames from "classnames";
import React, { memo, useMemo } from "react";

import { getObjectOfArray } from "Helpers/CustomFunc";
import { IValidError } from "Types";

interface ErrorInputMessageProps {
  errors: IValidError | IValidError[];
  inputName?: string;
  keyError?: string;
  MessageError?: string;
  className?: string;
}

export default memo(
  function ErrorInputMessage({
    errors,
    inputName,
    // keyError = "name",
    // MessageError = "msg",
    className,
  }: ErrorInputMessageProps) {
    const findErrors = useMemo(() => {
      if (Array.isArray(errors)) {
        return getObjectOfArray(errors, inputName, "name");
      }
    }, [errors, inputName]);

    if (!errors) {
      return null;
    }

    if (!Array.isArray(errors)) {
      if (errors["name"] === inputName) {
        return (
          <div className={classNames("errorMessage", className)}>
            {errors["msg"] || "This field can not be empty"}
          </div>
        );
      }

      return null;
    }

    if (findErrors) {
      return (
        <div className={classNames("errorMessage", className)}>
          {findErrors["msg"] || "This field can not be empty"}
        </div>
      );
    }

    return null;
  },
  (prevProps, nextProps) => {
    if (prevProps.errors !== nextProps.errors) {
      return false;
    }
    return true;
  }
);
