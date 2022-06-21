import React, { useMemo } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { getObjectOfArray } from "Helpers/CustomFunc";
import { ITag } from "Types";

// import styles from "./InputTags.module.css";

interface InputTagsProps {
  onChange: any;
  value?: string | string[] | number | number[];
  options?: ITag[];
  isMulti?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  name: string;
  index?: number;
  disabled?: boolean;
  isSearchable?: boolean;
  className?: string;
}

export default function InputTags({
  onChange,
  value,
  options = [],
  isMulti = true,
  placeholder,
  isClearable,
  name,
  index,
  disabled,
  className,
  isSearchable,
}: InputTagsProps) {
  const onChangeTags = (tag: MultiValue<ITag> | SingleValue<ITag>) => {
    onChange(tag, name, index);
  };

  const valueTags = useMemo(() => {
    if (Array.isArray(value)) {
      return value?.map((tag) => getObjectOfArray(options, tag));
    } else {
      return getObjectOfArray(options, value || "");
    }
  }, [value, options]);

  const styles = {
    singleValue: (provider: any, state: any) => {
      const color = "#495057";
      const fontWeight = "400";
      const fontSize = "1rem";
      const lineHeight = "1.5";
      return {
        ...provider,
        color,
        fontWeight,
        fontSize,
        lineHeight,
      };
    },
    control: (provider: any, state: any) => {
      const borderWidth = 1;
      const borderColor = state.isFocused ? "#06f" : "#ced4da";
      const boxShadow = "none";
      return { ...provider, borderWidth, borderColor, boxShadow };
    },
    placeholder: (provider: any, state: any) => {
      const color = "#495057";
      const fontWeight = "400";
      const fontSize = "1rem";
      const lineHeight = "1.5";

      return {
        ...provider,
        color,
        fontWeight,
        fontSize,
        lineHeight,
      };
    },
    indicatorsContainer: (provider: any) => {
      const cursor = "pointer";
      return { ...provider, cursor };
    },
  };

  return (
    <Select
      styles={styles}
      value={valueTags}
      options={options}
      onChange={onChangeTags}
      isMulti={isMulti}
      placeholder={placeholder}
      isClearable={isClearable}
      name={name}
      isDisabled={disabled}
      className={className}
      isSearchable={isSearchable}
    />
  );
}
