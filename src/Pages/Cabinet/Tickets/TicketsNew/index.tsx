import { FormControl, Button, FormCheck } from "react-bootstrap";
import { InputComp, InputTags } from "Components/MiniComponents";

import { useHistory } from "react-router";
import classNames from "classnames";

import { URL_TICKETS_ID } from "Constants/URLConstants/URLCabinet/URLTickets";

import styles from "./TicketsNewComp.module.css";

export default function TicketsNewPage() {
  const onSelect = () => {};

  const history = useHistory();

  const onClickSaveTickets = () => {
    history.push(URL_TICKETS_ID(1));
  };

  return (
    <div className={classNames(styles["main"], "wrapper")}>
      <h1 className={styles["title"]}>new ticket(in Programming)</h1>
      <div>
        <InputComp
          title={"Template"}
          classNameTitle={styles["inputTitle"]}
          errors={[]}
        >
          <InputTags
            isMulti={false}
            options={[{ label: "Template #1 ...", value: "1" }]}
            name={"template"}
            onChange={onSelect}
          />
        </InputComp>
        <InputComp
          title={"Question type"}
          classNameTitle={styles["inputTitle"]}
          errors={[]}
        >
          <div className={styles["InputRow"]}>
            <div className={styles["questionTypeItem"]}>
              <InputTags
                isMulti={false}
                options={[{ label: "General question 1", value: "1" }]}
                placeholder={"General question"}
                onChange={onSelect}
                name={"generalQestion"}
              />
            </div>
            <div
              className={classNames(
                styles["questionTypeItem"],
                styles["questionTypeItemRow"]
              )}
            >
              <div className={styles["questionTypeItemLabel"]}>Affiliate</div>
              <InputTags
                isMulti={false}
                placeholder={"Affiliate"}
                className={styles["questionTypeItemInput"]}
                onChange={onSelect}
                name={"affiliate"}
              />
            </div>
            <div
              className={classNames(
                styles["questionTypeItem"],
                styles["questionTypeItemRow"]
              )}
            >
              <div className={styles["questionTypeItemLabel"]}>Manager</div>
              <InputTags
                isMulti={false}
                placeholder={"Manager"}
                className={styles["questionTypeItemInput"]}
                onChange={onSelect}
                name={"manager"}
              />
            </div>
          </div>
        </InputComp>
        <InputComp
          title={"Subject"}
          classNameTitle={styles["inputTitle"]}
          errors={[]}
        >
          <FormControl
            as="textarea"
            placeholder={"Text"}
            className={styles["textArea"]}
          />
        </InputComp>
        <InputComp
          title={"Description"}
          classNameTitle={styles["inputTitle"]}
          errors={[]}
        >
          <FormControl
            as="textarea"
            placeholder={"Text"}
            className={styles["textArea"]}
          />
        </InputComp>
        <InputComp errors={[]}>
          <div className={styles["InputRow"]}>
            <div className={styles["questionTypeItem"]}>
              <Button variant={"outline-primary"}>Send to messenger</Button>
            </div>
            <div className={styles["questionTypeItem"]}>
              <FormCheck
                label={"Show commentator name"}
                className={classNames("checkbox", styles["checkBox"])}
                id={"checkBoxCommentName"}
              />
            </div>
            <div className={styles["questionTypeItem"]}>
              <FormCheck
                label={"Save as Template"}
                className={classNames("checkbox", styles["checkBox"])}
                id={"checkBoxTemplate"}
              />
            </div>
          </div>
        </InputComp>
      </div>
      <div className={styles["btnRow"]}>
        <Button onClick={onClickSaveTickets}>Save new ticket</Button>
      </div>
    </div>
  );
}
