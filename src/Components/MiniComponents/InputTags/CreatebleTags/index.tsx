import React, { useMemo } from "react";
import { MultiValue, SingleValue } from "react-select";

import CreatableSelect from "react-select/creatable";
import { ITag } from "Types";

interface CreatebleTagsProps {
  isMulti?: boolean;
  isClearable?: boolean;
  value: string | string[];
  onChange: any;
  isDisabled?: boolean;
  name: string;
}

export default function CreatebleTags({
  isClearable,
  isMulti,
  value,
  onChange,
  isDisabled,
  name,
}: CreatebleTagsProps) {
  const valueTags = useMemo((): ITag | ITag[] => {
    if (value) {
      if (typeof value === "string") {
        return { label: value, value };
      } else {
        return value.map((tag) => ({ label: tag, value: tag }));
      }
    }
    return [];
  }, [value]);

  const onChangeTags = (tag: MultiValue<ITag> | SingleValue<ITag>) => {
    onChange(tag, name);
  };

  return (
    <CreatableSelect
      isMulti={isMulti}
      isClearable={isClearable}
      value={valueTags}
      onChange={onChangeTags}
      isDisabled={isDisabled}
    />
  );
}
