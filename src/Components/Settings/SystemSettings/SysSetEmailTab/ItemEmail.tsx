import React, { useState } from "react";
import { InputComp, Line } from "Components/MiniComponents";
import { Button, Modal } from "react-bootstrap";

import { ISettingsEmail } from "./Constants";

import { SettingsApi } from "Helpers/api";
import { useAppDispatch } from "Hooks";

import { animateScroll } from "react-scroll";

import styles from "../Styles/index.module.css";

interface SysSetItemEmailProps extends ISettingsEmail {
  setEditData?: any;
  loading?: boolean;
  disabledDelete?: boolean;
}

export default function SysSetItemEmail({
  protocol,
  id,
  type,
  server,
  port,
  password,
  user,
  loading,
  setEditData,
  disabledDelete,
}: SysSetItemEmailProps) {
  const { fetchSetEmail } = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const clickEditEmail = () => {
    animateScroll.scrollToTop();
    setEditData({ protocol, id, type, server, port, password, user });
  };

  const clickDeleteEmail = () => {
    if (id) {
      SettingsApi.deleteSettingsEmail(id).then(() => {
        setShowModal(false);
        fetchSetEmail();
      });
    }
  };

  return (
    <div key={id}>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          You definitely want to delete this server ({server})?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button variant="danger" onClick={clickDeleteEmail}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <InputComp title={"Data type"} errors={[]} loading={loading}>
        <div className={styles.rowEmailString}>{protocol}</div>
      </InputComp>

      <InputComp title={"Protocol"} errors={[]} loading={loading}>
        <div className={styles.rowEmailString}>{type}</div>
      </InputComp>
      <InputComp title={"SMTP-server"} errors={[]} loading={loading}>
        <div className={styles.rowEmailString}>{server}</div>
      </InputComp>
      <InputComp title={"SMTP-port"} errors={[]} loading={loading}>
        <div className={styles.rowEmailString}>{port}</div>
      </InputComp>
      <InputComp title={"SMTP-login"} errors={[]} loading={loading}>
        <div className={styles.rowEmailString}>{user}</div>
      </InputComp>
      <InputComp title={"SMTP-password"} errors={[]} loading={loading}>
        <div className={styles.rowEmailString}>{password}</div>
      </InputComp>

      <div className={styles.btnSaveRow}>
        <Button onClick={clickEditEmail} disabled={loading}>
          Edit
        </Button>
        <Button
          onClick={handleShowModal}
          className={styles.emailCloseBtn}
          variant={"danger"}
          disabled={loading || disabledDelete}
        >
          Delete
        </Button>
      </div>

      <Line className={"spaceBlock32"} />
    </div>
  );
}
