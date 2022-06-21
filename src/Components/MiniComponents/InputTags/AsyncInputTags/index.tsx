import React from "react";
import Select from "react-select/async";
import { ITag } from "Types";

// import { debounce } from "debounce";

// import styles from "./InputTags.module.css";

interface InputTagsProps {
  onChange: any;
  value?: ITag | ITag[];
  options?: ITag[]; // Пред установленные options
  isMulti?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  name: string;
  index?: number;
  disabled?: boolean;
  isSearchable?: boolean;
  className?: string;
  loadAction?: any; // Функция авто-комплитера
}

export default function AsyncInputTags({
  value,
  options,
  isMulti = true,
  placeholder,
  isClearable,
  loadAction,
  name,
  index,
  className,
  //   debounceAwait = 400,
  disabled,
  onChange,
}: InputTagsProps) {
  const onChangeSelect = (tag: any) => {
    onChange(tag, name, index);
  };

  const loadOptions = async (inputValueFunc: any, callback: any) => {
    const options = await loadAction(inputValueFunc);
    callback(options);
  };

  // const debounceLoadOptions = debounce(loadOptions, debounceAwait);

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
      value={value || ""}
      onChange={onChangeSelect}
      isMulti={isMulti}
      placeholder={placeholder}
      isClearable={isClearable}
      loadOptions={loadOptions}
      defaultOptions={options}
      name={name}
      className={className}
      isDisabled={disabled}
    />
  );
}
