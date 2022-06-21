import React from "react";
import { NavigationTabs } from "Components/MiniComponents";
import { TabItemProps } from "Components/MiniComponents/NavigationTabs/TabItem";

import styles from "./SettingsHeader.module.css";

interface SettingsHeaderProps {
  urlArray: TabItemProps[];
  title: string;
}

export default function SettingsHeader({
  urlArray,
  title,
}: SettingsHeaderProps) {
  return (
    <div>
      <div></div>
      <div className={styles["title"]}>{title}</div>
      <div>
        <NavigationTabs items={urlArray} />
      </div>
    </div>
  );
}
