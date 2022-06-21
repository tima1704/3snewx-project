import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { InputComp } from "Components/MiniComponents";

import { SettingsApi } from "Helpers/api";

import styles from "../Styles/index.module.css";

interface SendTestEmailProps {
  id: number;
}

interface ErrorTestEmail {
  type: "success" | "error";
  message: string;
}

export default function SendTestEmail({ id }: SendTestEmailProps) {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState<ErrorTestEmail | undefined>(undefined);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onClickSendEmail = () => {
    setDisabled(true);
    const emailFunc = email;
    SettingsApi.sendTestEmailSettings(id, emailFunc)
      .then((res) => {
        setStatus({
          type: "success",
          message: `Test message successfully send to the email “${emailFunc}”`,
        });
      })
      .catch((e) => {
        setStatus({
          type: "error",
          message: `Can’t send test email to “${emailFunc}”`,
        });
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <InputComp errors={[]} title={"Send test email"}>
      <div>
        <div className={styles["btnGenerateRow"]}>
          <Form.Control
            value={email}
            onChange={onChangeEmail}
            disabled={disabled}
          />
          <Button
            className={styles["btnGenerateCode"]}
            disabled={disabled}
            onClick={onClickSendEmail}
            variant={"outline-primary"}
          >
            Send
          </Button>
        </div>
        {status && (
          <p
            className={
              status.type === "error" ? "errorMessage" : "successMessage"
            }
          >
            {status.message}
          </p>
        )}
      </div>
    </InputComp>
  );
}
