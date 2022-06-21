import classNames from "classnames";
import React, { useMemo } from "react";

import { Form, Row, Col } from "react-bootstrap";
import { getObjectOfArray } from "Helpers/CustomFunc";
import { IValidError } from "Types";
import ErrorInputMessage from "../ErrorInputMessage";

import Skeleton from "react-loading-skeleton";

interface InputCompProps {
  errorsInput?: IValidError[];
  errors: IValidError[];
  errorKey?: string;
  value?: string;
  onChange?: any;
  name?: string;
  placeholder?: string;
  classNameBlock?: string;
  classNameInputBlock?: string;
  classNameInput?: string;
  classNameErrorMessage?: string;
  classNameTitle?: string;
  title?: string;
  smTitle?: number;
  smInput?: number;
  children?: React.ReactChild;
  disabled?: boolean;
  loading?: boolean;
  as?: any;
  index?: number;
  id?: string;
  type?: "textArea" | "number" | "text";
  min?: string | number;
  max?: string | number;
  maxLength?: number;
}

export default // React.memo(
function InputComp({
  errorsInput,
  errorKey,
  value,
  onChange,
  name,
  placeholder,
  classNameBlock,
  classNameInputBlock,
  classNameInput,
  classNameErrorMessage,
  classNameTitle,
  title,
  smTitle = 3,
  smInput = 9,
  children,
  errors,
  disabled,
  loading,
  index,
  id,
  type = "text",
  min,
  max,
  maxLength,
}: InputCompProps) {
  const error = useMemo(() => {
    return getObjectOfArray(errorsInput || errors, errorKey || name, "name");
  }, [errorsInput, errors, errorKey, name]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, name, index);
  };

  return (
    <Form.Group
      as={Row}
      controlId={id || name}
      className={classNames("spaceBlock32", classNameBlock)}
    >
      <Form.Label column sm={smTitle} className={classNames(classNameTitle)}>
        {title}
      </Form.Label>
      <Col sm={smInput} className={classNames(classNameInputBlock)}>
        {loading ? (
          <Skeleton style={{ height: 38 }} />
        ) : children ? (
          children
        ) : (
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChangeHandler}
            value={value || ""}
            isInvalid={error ? true : false}
            className={classNames(classNameInput)}
            disabled={disabled}
            min={min}
            max={max}
            maxLength={maxLength}
            // autoComplete={""}
          />
        )}
        <ErrorInputMessage
          errors={error}
          inputName={errorKey || name}
          className={classNames(classNameErrorMessage)}
        />
      </Col>
    </Form.Group>
  );
}
