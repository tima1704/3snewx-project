import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import classNames from "classnames";

interface InputSearchProps {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  mb20?: boolean;
  input?: boolean;
}

export default function InputSearch({
  id,
  name,
  placeholder,
  className,
  value,
  onChange,
  mb20 = true,
  input,
}: InputSearchProps) {
  return (
    <InputGroup className={classNames({ spaceBlock20: mb20 }, className)}>
      <InputGroup.Text className="bg-transparent border-right-0">
        <svg
          width="14"
          height="14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.65 13.35a.5.5 0 10.7-.7l-.7.7zm-2.6-3.29l-.35-.35.36.35zm-3.74 1.06A4.8 4.8 0 011.5 6.3h-1c0 3.2 2.6 5.8 5.8 5.8v-1zM1.5 6.3A4.8 4.8 0 016.3 1.5v-1A5.8 5.8 0 00.5 6.3h1zM6.3 1.5a4.8 4.8 0 014.82 4.8h1c0-3.2-2.6-5.8-5.81-5.8v1zm4.82 4.8A4.8 4.8 0 019.7 9.72l.71.7a5.8 5.8 0 001.7-4.1h-1zM9.7 9.72a4.8 4.8 0 01-3.4 1.4v1a5.8 5.8 0 004.11-1.7l-.7-.7zm0 .7l2.95 2.94.7-.7-2.94-2.94-.7.7z"
            fill="#D6E3EC"
          />
        </svg>
      </InputGroup.Text>

      {input ? (
        input
      ) : (
        <FormControl
          name={name}
          id={id}
          className="border-left-0 pl-0"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </InputGroup>
  );
}
