import styles from "./index.module.css";

export default function ItemDataOffer({
  label,
  children,
}: {
  label: string;
  children: JSX.Element | string;
}) {
  return (
    <div className={styles["itemRow"]}>
      <span className={styles["itemRowLabel"]}>{label}:</span>
      {children}
    </div>
  );
}
