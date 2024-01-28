import styles from "../styles/HistoryWidget.module.scss";

export default function HistoryWidget({ content }) {
  return (
    <div className={styles.historyWidget}>
      <div className={styles.up}>
        <div className={`${styles.overviewWrapper} ${styles.box} `}>
          <div className={styles.titleDetialWrapper}>
            <div className={styles.title}>{content.title}</div>
            <div className={styles.detail}>{content.detail}</div>
          </div>
          <div className={styles.date}>{content.date}</div>
          <div className={styles.amount}>${content.amount.toFixed(2)}</div>
        </div>
        <div className={`${styles.status}`}>Completed</div>
      </div>
      <div className={styles.down}>
        <div className={styles.location}>
          <div className={styles.locationText}>{content.location}</div>
          <div className={styles.iconAndTitle}>
            <div className={styles.icon}>
              <img src="/icons/locationIcon.svg" alt="loaction icon" />
            </div>
            Location
          </div>
        </div>
        <div className={styles.link}>
          <div className={styles.icon}>
            <img src="/icons/linkIcon.svg" alt="link icon" />
          </div>
          <div className={styles.title}>Link</div>
        </div>
      </div>
    </div>
  );
}
