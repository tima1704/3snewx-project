import classNames from "classnames";
import { Icon } from "Components/MiniComponents";
import React, { useState } from "react";
import { Button, Card, Collapse } from "react-bootstrap";
import { IErrorbilling } from "../types";

import styles from "./BillingErrorComp.module.css";

interface BillingErrorCompProps extends IErrorbilling {
  index: number;
}

export default function BillingErrorComp({
  type,
  text,
  value,
  btn,
  index,
}: BillingErrorCompProps) {
  const [open, setOpen] = useState(false);

  const onClickOpenCard = () => {
    setOpen(!open);
  };

  const onClickbtn = () => {
    console.log(btn?.link);
  };

  if (!type) {
    return (
      <Card className={styles["errorCard"]}>
        {text}
        {btn && (
          <div>
            <Button className={styles["btn"]} onClick={onClickbtn}>
              {btn.text}
            </Button>
          </div>
        )}
      </Card>
    );
  }

  switch (type) {
    case "collection":
      return (
        <Card className={open ? styles["accordionCard"] : styles["errorCard"]}>
          <div onClick={onClickOpenCard} className={styles["title"]}>
            {text}
            <Icon
              className={classNames({
                [styles["icon"]]: true,
                [styles["iconOpen"]]: open,
              })}
              icon="right-chevron"
            />
          </div>
          <Collapse in={open} unmountOnExit={true}>
            <div className={styles["accordionBlock"]}>
              {value?.map((item, indexItem) => (
                <BillingErrorComp
                  index={indexItem}
                  {...item}
                  key={index + "accord" + indexItem}
                />
              ))}
            </div>
          </Collapse>
        </Card>
      );

    default:
      return (
        <Card className={styles["errorCard"]}>
          {text}
          {btn && (
            <div>
              <Button className={styles["btn"]} onClick={onClickbtn}>
                {btn.text}
              </Button>
            </div>
          )}
        </Card>
      );
  }
}
