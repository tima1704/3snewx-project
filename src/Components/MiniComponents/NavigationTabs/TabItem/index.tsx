import React from "react";

import { Badge, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import styles from "../NavigationTabs.module.css";

export interface TabItemProps {
  title?: string;
  to: string;
  children?: string;
  includes: string;
  badges?: number;
}

export default function TabItem({
  title,
  to,
  children,
  includes,
  badges,
}: TabItemProps) {
  return (
    <Nav.Item>
      <LinkContainer
        to={to}
        activeClassName={styles.active}
        isActive={(match, location) => {
          return location.pathname.includes(includes);
        }}
      >
        <Nav.Link as={Link} to={to}>
          {title}
          {children}
          {badges !== 0 && (
            <Badge bg="danger" pill className={styles["badges"]}>
              {badges}
            </Badge>
          )}
        </Nav.Link>
      </LinkContainer>
    </Nav.Item>
  );
}

