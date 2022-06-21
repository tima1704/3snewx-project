import React from "react";

import styles from "./NavigationTabs.module.css";

import { Nav } from "react-bootstrap";

import classNames from "classnames";
import TabItem, { TabItemProps } from "./TabItem";

interface NavigationTabsProps {
  items: TabItemProps[];
  className?: string;
}

export default function NavigationTabs({
  items,
  className,
}: NavigationTabsProps) {
  return (
    <Nav className={classNames(styles.NavigationTabs, className)}>
      {items.map(({ title, to, includes, badges }) => (
        <TabItem
          key={`tab_item_${title}`}
          title={title}
          to={to}
          includes={includes}
          badges={badges}
        />
      ))}
    </Nav>
  );
}
