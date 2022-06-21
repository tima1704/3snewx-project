import React from "react";

import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { URL_OFFER } from "Constants/URLConstants/URLCabinet";

import styles from "./AEOfferFooter.module.css";

interface AEOfferFooterProps {
  onClickSaveFunc: any;
  tab: string;
  draft: boolean;
  newStatus?: boolean;
  disabled?: boolean;
}

export default function AEOfferFooter({
  onClickSaveFunc,

  draft = false,
  disabled,
}: AEOfferFooterProps) {
  const history = useHistory();

  const onClickCancel = () => {
    history.push(draft ? URL_OFFER.URL_OFFERS_DRAFT : URL_OFFER.URL_OFFERS);
  };

  const onClickSave = () => {
    onClickSaveFunc();
  };

  return (
    <Row className={styles.footer}>
      <Col>
        <Button variant="danger" onClick={onClickCancel}>
          Cancel
        </Button>
      </Col>
      <Col className={`text-right ${styles.spaceBlock_L20}`}>
        <Button onClick={onClickSave} disabled={disabled}>
          Save
        </Button>
      </Col>
    </Row>
  );
}
