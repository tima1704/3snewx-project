import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import { ILanguages } from "Types";

import styles from "./index.module.css";

interface SelectLangProps {
  languages: ILanguages[];
  keyText?: string;
  onSelect: Dispatch<SetStateAction<string>>;
  value: string;
  className?: string;
}

export default function SelectLang({
  languages,
  keyText,
  onSelect,
  value,
  className = "",
}: SelectLangProps) {
  const onSelectLang = (lang: string) => {
    onSelect(lang);
  };

  return (
    <div className={classNames(styles.SimpleTabs, className)}>
      {languages?.map((itemLang, indexLang) => {
        return (
          <div
            key={"lang" + keyText + indexLang}
            className={classNames({
              [styles.Active]: value === itemLang.value,
            })}
            onClick={() => onSelectLang(itemLang.value)}
          >
            {itemLang.title}
          </div>
        );
      })}
    </div>
  );
}
