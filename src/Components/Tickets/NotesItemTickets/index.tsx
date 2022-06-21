import React from "react";

import styles from "./NotesItemTickets.module.css";
import { INotesItemTickets } from "./types";

export default function NotesItemTickets({
  name,
  date,
  comment,
}: INotesItemTickets) {
  return (
    <div className={styles["notes"]}>
      <span className={styles["name"]}>{name}</span>{" "}
      <span className={styles["date"]}>({date}):</span> {comment}
    </div>
  );
}
