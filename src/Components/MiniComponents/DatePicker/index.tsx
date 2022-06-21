import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./DatePicker.module.css";

import DatePicker, { registerLocale } from "react-datepicker";
import { ru, enIN } from "date-fns/locale";
import classNames from "classnames";
registerLocale("ru", ru);
registerLocale("en", enIN);

interface DatePickerProps {
  onChange: any;
  value: Date;
  minDate?: Date;
  className?: string;
  locale?: string;
  disabled?: boolean;
}

export default function DatePickerComp({
  onChange,
  value,
  minDate,
  className = "",
  locale = "en",
  disabled,
}: DatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={value || startDate}
      onChange={(date: Date) => {
        onChange(date) || setStartDate(date);
      }}
      locale={locale}
      dateFormat={"dd-MM-yyyy"}
      minDate={minDate}
      className={classNames("form-control", { [className]: className })}
      wrapperClassName={styles["date"]}
      disabled={disabled}
    />
  );
}
