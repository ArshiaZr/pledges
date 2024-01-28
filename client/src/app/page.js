"use client";
import { useEffect, useState } from "react";
import OngoingWidget from "../Components/OngoingWidget";
import styles from "../styles/Home.module.scss";
import { useAppStatesContext } from "@/contexts/states";

export default function Home() {
  const { allPledges } = useAppStatesContext();
  const [ongoings, setOngoings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.replace("/login");
  }, []);
  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < allPledges.length; i++) {
      if (!allPledges[i].completed) tmp.push(allPledges[i]);
    }
    setOngoings(tmp);
  }, [allPledges]);

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
          {ongoings.map((each, idx) => {
            return <OngoingWidget key={each._id} content={each} />;
          })}
        </div>
      </div>
    </main>
  );
}
