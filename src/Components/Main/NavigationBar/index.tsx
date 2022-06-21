import React from "react";

import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { URL_HOME } from "Constants/URLConstants";

import classNames from "classnames";

import { Link } from "react-router-dom";
import { MainMenuItems } from "./constants";

import styles from "./NavigationBar.module.css";

export interface IMainMenu {
  title: string;
  to: string;
  bottomContainer?: { title: string; to: string }[];
}

function MenuItem({ to, title, bottomContainer }: IMainMenu) {
  return (
    <Nav.Item>
      <div className={styles["hover"]}>
        <LinkContainer
          to={to}
          activeClassName={styles.active}
          exact={to === URL_HOME}
        >
          <Nav.Link>{title}</Nav.Link>
        </LinkContainer>
        {bottomContainer && (
          <div className={styles["blockBottom"]}>
            {bottomContainer.map((link, index) => (
              <div className={styles["linkBottom"]} key={index + "link" + to}>
                <Link to={link.to}>{link.title}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Nav.Item>
  );
}

export default function NavigationBar() {
  return (
    <Nav
      as={"section"}
      className={classNames(
        styles.navigationBar,
        "d-flex justify-content-between"
      )}
    >
      {MainMenuItems.map((props) => (
        <MenuItem key={`menu_item_${props.to}`} {...props} />
      ))}
    </Nav>
  );
}
