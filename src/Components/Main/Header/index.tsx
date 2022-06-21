import React from "react";

import { Link } from "react-router-dom";
import classNames from "classnames";

import { URL_HOME } from "../../../Constants/URLConstants";

import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import UserPreferenceBar from "./UserPreferenceBar";
import LanguageSwitch from "../../MiniComponents/LanguageSwitch";
import Logo from "../../MiniComponents/Logo";

import styles from "./Header.module.css";
import { useAppSelector } from "Hooks";

interface HeaderProps {
  username?: string;
}

export default function Header({ username }: HeaderProps) {
  const { isLogged, languageApp } = useAppSelector((state) => state.App);
  return (
    <header className={classNames("header", styles["header"])}>
      <Link to={URL_HOME}>
        <Logo />
      </Link>
      {!isLogged && (
        <div
          className={classNames(
            "header-navigation text-uppercase flex-1",
            styles["header__plug"]
          )}
        />
      )}
      {isLogged && (
        <Nav
          activeKey="/home"
          className={classNames(
            "header-navigation text-uppercase flex-1",
            styles["header__links"]
          )}
        >
          <Nav.Item>
            <LinkContainer to={"/"}>
              <Nav.Link>Payment systems</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to={"/"}>
              <Nav.Link>Referrals</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      )}
      <div className={styles["header_lang-user"]}>
        {isLogged && username && <UserPreferenceBar memberName={username} />}
        <LanguageSwitch active={languageApp} />
      </div>
    </header>
  );
}
