import styles from "../styles/HistoryWidget.module.scss";
import { formatDate } from "@/utils/date";

export default function HistoryWidget({ content }) {
  return (
    <div className={styles.historyWidget}>
      <div className={styles.up}>
        <div className={`${styles.overviewWrapper} ${styles.box} `}>
          <div className={styles.titleDetialWrapper}>
            <div className={styles.title}>{content.title}</div>
            <div className={styles.detail}>{content.detail}</div>
          </div>
          <div className={styles.date}>
            {new Date(content.dateDue.toString()).toString()}
          </div>
          <div className={styles.amount}>${content.amount.toFixed(2)}</div>
        </div>
        <div
          className={`${styles.status} ${
            !content.success ? styles.failed : ""
          }`}
        >
          {content.success ? "Successful" : "Failed"}
        </div>
      </div>
      <div className={styles.down}>
        <div className={styles.location}>
          <div className={styles.locationText}>
            {content.location.name.toString()}
          </div>
          <div className={styles.iconAndTitle}>
            <div className={styles.icon}>
              <img src="/icons/locationIcon.svg" alt="loaction icon" />
            </div>
            Location
          </div>
        </div>
        <a
          href={content.link}
          target="__blank"
          className={`${styles.link} ${content.link ? styles.active : ""}`}
        >
          <div className={styles.icon}>
            <img src="/icons/linkIconGray.svg" alt="link icon" />
            <img src="/icons/linkIcon.svg" alt="link icon" />
          </div>
          <div className={styles.title}>Link</div>
        </a>
      </div>
    </div>
  );
}
