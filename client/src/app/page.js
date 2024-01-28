"use client";
import { useEffect } from "react";
import OngoingWidget from "../Components/OngoingWidget";
import styles from "../styles/Home.module.scss";

const ongoings = [{}];

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.replace("/login");
  }, []);
  return (
    <main id={styles.home}>
      <div className={styles.header}>
        <div className={styles.localTime}>Friday, Sat Jan 27</div>
        <button
          className={styles.singOutButton}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.replace("/login");
          }}
        >
          Sign Out
        </button>
      </div>
      <div className={styles.ongoingPledges}>
        <div className={styles.title}>Ongoing Pledges</div>
        <div className={styles.wrapper}>
          <OngoingWidget
            content={{
              title: "Zoom Meeting at 2 with Microsoft",
              detail:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-29 at 2:00 PM",
              amount: 10,
              link: "https://google.com",
              priority: 2,
              location: "433 Harlem Ave Toronto, ON",
            }}

            // key={0}
          />
          <OngoingWidget
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
          <OngoingWidget
            content={{
              title: "Zoom Meeting at 2 with Microsof",
              detail:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-29 at 2:00 PM",
              amount: 10,
              link: "https://google.com",
              priority: 1,
              location: "433 Harlem Ave Toronto, ON",
            }}

            // key={0}
          />
        </div>
      </div>
    </main>
  );
}
