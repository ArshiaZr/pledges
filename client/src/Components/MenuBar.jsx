import Link from "next/link";
import styles from "../styles/MenuBar.module.scss";

export default function MenuBar() {
  return (
    <div id={styles.menuBar}>
      <Link href="/" className={`${styles.home}  ${styles.circle}`}>
        <img src="/icons/homeIcon.svg" alt="Home" />
      </Link>
      <button className={` ${styles.circle} ${styles.addPledgeButton}`}>
        <img src="/icons/addIcon.svg" alt="Add pledge" />
      </button>
      <Link href="/history" className={`${styles.history}  ${styles.circle}`}>
        <img src="/icons/historyIcon.svg" alt="History" />
      </Link>
    </div>
  );
}
