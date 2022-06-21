import classNames from "classnames";

import styles from "./index.module.css";

import anchor from "./img/ico-anchor.svg";
import icoArrowGoBackFill from "./img/ico-arrow-go-back-fill.svg";
import calendar from "./img/ico-calendar.svg";
import check from "./img/ico-check.svg";
import checkFill from "./img/ico-check-fill.svg";
import closeFill from "./img/ico-close-fill.svg";
import duplicate from "./img/ico-duplicate.svg";
import editPlaceholder from "./img/ico-edit-placeholder.svg";
import exportIcon from "./img/ico-export.svg";
import eyeBlue from "./img/ico-eye-b.svg";
import eyeOutline from "./img/ico-eye-outline.svg";
import eye from "./img/ico-eye.svg";
import graph from "./img/ico-graph.svg";
import importIcon from "./img/ico-import.svg";
import info from "./img/ico-info.svg";
import loginBoxOutline from "./img/ico-login-box-outline.svg";
import member from "./img/ico-member.svg";
import members from "./img/ico-members.svg";
import pencil from "./img/ico-pencil.svg";
import person from "./img/ico-person.svg";
import plus from "./img/ico-plus.svg";
import powerRed from "./img/ico-power-red.svg";
import power from "./img/ico-power.svg";
import print from "./img/ico-print.svg";
import reset from "./img/ico-reset.svg";
import rightChevron from "./img/ico-right-chevron.svg";
import subtractLine from "./img/ico-subtract-line.svg";
import trash from "./img/ico-trash.svg";

export type Icons =
  | "anchor"
  | "arrow-go-back-fill"
  | "calendar"
  | "check-fill"
  | "check"
  | "close-fill"
  | "duplicate"
  | "edit-placeholder"
  | "export"
  | "eye-b"
  | "eye-outline"
  | "eye"
  | "graph"
  | "import"
  | "info"
  | "login-box-outline"
  | "member"
  | "members"
  | "pencil"
  | "person"
  | "plus"
  | "power-red"
  | "power"
  | "print"
  | "reset"
  | "right-chevron"
  | "subtract-line"
  | "trash";

interface IIconsSvg {
  [iconName: string]: string;
}

const IconsSvg: IIconsSvg = {
  anchor,
  "arrow-go-back-fill": icoArrowGoBackFill,
  calendar,
  "check-fill": checkFill,
  check,
  "close-fill": closeFill,
  duplicate,
  "edit-placeholder": editPlaceholder,
  export: exportIcon,
  "eye-b": eyeBlue,
  "eye-outline": eyeOutline,
  eye,
  graph,
  import: importIcon,
  info,
  "login-box-outline": loginBoxOutline,
  member,
  members,
  pencil,
  person,
  plus,
  "power-red": powerRed,
  power,
  print,
  reset,
  trash,
  "right-chevron": rightChevron,
  "subtract-line": subtractLine,
};

export interface IconProps {
  icon: Icons;
  className?: string;
  ml?: boolean;
  mr?: boolean;
}

export default function Icon({ icon, className = "", ml, mr }: IconProps) {
  return (
    <img
      src={IconsSvg[icon]}
      alt="icon"
      className={classNames(className, { [styles.ml]: ml, [styles.mr]: mr })}
    />
  );
}
