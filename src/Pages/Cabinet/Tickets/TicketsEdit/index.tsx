import classNames from "classnames";

import { Card, FormCheck, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InputComp, InputTags } from "Components/MiniComponents";
import NotesItemTickets from "Components/Tickets/NotesItemTickets";
import { INotesItemTickets } from "Components/Tickets/NotesItemTickets/types";

import styles from "./TicketsEditComp.module.css";

const data: INotesItemTickets[] = [
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
  {
    name: "Sergey Mitrakov",
    date: "2019-08-31 10:37:32",
    comment:
      "Hello! The offer is connected. Pay attention to the test volume and conditions of traffic verification.",
  },
];

export default function TicketsEditPage() {
  const onSelect = () => {};

  return (
    <div className={classNames(styles["main"], "wrapper")}>
      <div className={styles["form"]}>
        <h1 className={styles["title"]}>ticket #00275 (in Programmig)</h1>
        <div>
          <InputComp
            errors={[]}
            title={"Question type"}
            classNameTitle={styles["titleInputNotActive"]}
          >
            <div className={styles["notActiveInput"]}>General question</div>
          </InputComp>
          <InputComp
            errors={[]}
            title={"Affiliate"}
            classNameTitle={styles["titleInputNotActive"]}
          >
            <div className={styles["notActiveInput"]}>
              (4715) 9xdangcap@gmail.com
              <Link
                to={"/"}
                //   href={}
                className={styles["linkInput"]}
              >
                Show card
              </Link>
            </div>
          </InputComp>
          <InputComp
            errors={[]}
            title={"Manager"}
            classNameTitle={styles["titleInputNotActive"]}
          >
            <div className={styles["notActiveInput"]}>Sergey Mitrakov</div>
          </InputComp>
          <InputComp
            errors={[]}
            title={"Offer"}
            classNameTitle={styles["titleInputNotActive"]}
          >
            <div className={styles["notActiveInput"]}>
              Offer preview
              <Link
                //   href={}
                to={"/"}
                className={styles["linkInput"]}
              >
                Show card
              </Link>
            </div>
          </InputComp>
          <InputComp
            title={"Subject"}
            classNameTitle={styles["titleInput"]}
            errors={[]}
          >
            <FormControl as={"textarea"} />
          </InputComp>
          <InputComp
            title={"Description"}
            classNameTitle={styles["titleInput"]}
            errors={[]}
          >
            <FormControl as={"textarea"} />
          </InputComp>
          <InputComp
            title={"Status"}
            classNameTitle={styles["titleInput"]}
            errors={[]}
          >
            <div>
              <div className={styles["inputStatus"]}>
                <InputTags onChange={onSelect} name={""} />
              </div>
              <div className={styles["inputStatusRow"]}>
                <FormCheck
                  label={"Approve"}
                  className={classNames("checkbox", styles["checkBox"])}
                />
                <FormCheck
                  label={"Reject"}
                  className={classNames("checkbox", styles["checkBox"])}
                />
              </div>
            </div>
          </InputComp>
          <InputComp
            title={"Response template"}
            classNameTitle={styles["titleInput"]}
            errors={[]}
          >
            <InputTags onChange={onSelect} name={""} />
          </InputComp>
          <InputComp
            title={"Сomment"}
            classNameTitle={styles["titleInput"]}
            errors={[]}
          >
            <FormControl as={"textarea"} />
          </InputComp>
          <InputComp
            errors={[]}
            title={"Attachments"}
            classNameTitle={styles["titleInput"]}
          >
            <div className={styles["attachmentsRow"]}>
              <div>
                <Button
                  variant={"outline-primary"}
                  className={styles["btnFile"]}
                >
                  Add File
                </Button>
                <span className={styles["notFile"]}>No added file</span>
              </div>
              <div>
                <FormCheck
                  label={"Save as Template"}
                  className={classNames("checkbox", styles["checkBox"])}
                />
              </div>
            </div>
          </InputComp>
        </div>
        <div className={styles["btnRow"]}>
          <Button>Send</Button>
        </div>
      </div>
      <div className={styles["comments"]}>
        <Card className={styles["commentsCard"]}>
          {data.map((item, index) => (
            <NotesItemTickets key={"notes" + index} {...item} />
          ))}
        </Card>
      </div>
    </div>
  );
}
