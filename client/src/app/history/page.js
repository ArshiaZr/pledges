import HistoryWidget from "../../Components/HistoryWidget";
import styles from "../../styles/History.module.scss";

export default function History() {
  return (
    <main id={styles.history}>
      <div className={styles.ongoingPledges}>
        <div className={styles.title}>History</div>
        <div className={styles.wrapper}>
          <HistoryWidget
            content={{
              title: "Zoom Meeting at 2 with Microsoft",
              detail:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-29 at 2:00 PM",
              amount: 10,
              link: "https://google.com",
              priority: 0,
              location: "433 Harlem Ave Toronto, ON",
            }}

            // key={0}
          />
          <HistoryWidget
            content={{
              title: "Zoom Meeting at 2 with Microsof",
              detail:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-29 at 2:00 PM",
              amount: 10,
              link: "https://google.com",
              priority: 0,
              location: "433 Harlem Ave Toronto, ON",
            }}

            // key={0}
          />
        </div>
      </div>
    </main>
  );
}
