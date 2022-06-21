import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { InputComp } from "Components/MiniComponents";

import styles from "Components/Partners/Styles/TestingLinks.module.css";

export default function TestingLinks() {
  const [link, setLink] = useState("");
  const [status] = useState<"error" | "success" | "">("");

  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  // отправляем ссылку на бэк и получаем статус

  return (
    <div className={styles["main"]}>
      <h1>Testing links</h1>
      <InputComp title={"Testing links"} errors={[]}>
        <div>
          <div className={styles["inputsRow"]}>
            <Form.Control
              type="text"
              placeholder={"Enter affiliate outer link"}
              onChange={onChangeLink}
              value={link}
            />
            <Button disabled={!link}>Run</Button>
          </div>
          <div>
            {status === "success" ? (
              <div className={styles["success"]}>
                Testing postback was successful!
              </div>
            ) : (
              status === "error" && (
                <div className={styles["error"]}>Testing postback failed</div>
              )
            )}
          </div>
        </div>
      </InputComp>
    </div>
  );
}
