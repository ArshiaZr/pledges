import styles from "../styles/OngoingWidget.module.scss";

export default function OngoingWidget({ content }) {
  return (
    <div className={styles.ongoingWidget}>
      <button
        className={styles.editButton}
        // onClick={() => {
        //   console.log("edit");
        //   //TODO: edit
        // }}
      >
        <img src="/icons/editIcon.svg" alt="edit pledge" />
      </button>
      <div className={styles.up}>
        <div className={`${styles.overviewWrapper} ${styles.box} `}>
          <div className={styles.titleDetialWrapper}>
            <div className={styles.title}>{content.title}</div>
            <div className={styles.detail}>{content.detail}</div>
          </div>
          <div className={styles.date}>{content.date}</div>
        </div>
        <div
          className={`${styles.timeLeftWrapper} ${styles.box} ${styles.square}`}
        >
          <div className={styles.time}>
            <div className={styles.title}>Time Left</div>
            <div className={styles.clock}>00:00</div>
          </div>
        </div>
      </div>
      <div className={styles.down}>
        <div
          className={`${styles.amountWrapper} ${styles.box}  ${styles.square}`}
        >
          <div className={styles.amount}>${content.amount.toFixed(2)}</div>
        </div>
        <div
          className={`${styles.locationWrapper} ${styles.box}  ${styles.square}`}
        >
          <div className={styles.locationText}>{content.location}</div>
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
          className={`${styles.linkWrapper}  ${styles.box}  ${styles.square} ${
            content.link ? styles.active : ""
          }`}
        >
          <div className={styles.icon}>
            <img src="/icons/linkIconGray.svg" alt="link icon" />
            <img src="/icons/linkIcon.svg" alt="link icon" />
          </div>
          <div className={styles.title}>Link</div>
        </a>
        <div
          className={`${styles.priorityWrapper} ${styles.box}  ${
            styles.square
          } ${
            content.priority == 0
              ? styles.low
              : content.priority == 1
              ? styles.medium
              : styles.high
          }`}
        >
          <div className={`${styles.icon}`}>
            <img src="/icons/priorityIconGray.svg" alt="priority icon" />
            <img src="/icons/priorityIconBlue.svg" alt="priority icon" />
            <img src="/icons/priorityIcon.svg" alt="priority icon" />
          </div>
          <div className={styles.title}>Priority</div>
        </div>
      </div>
    </div>
  );
}
