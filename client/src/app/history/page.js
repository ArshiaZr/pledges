"use client";
import { useEffect, useState } from "react";
import HistoryWidget from "../../Components/HistoryWidget";
import styles from "../../styles/History.module.scss";
import { useAppStatesContext } from "@/contexts/states";

export default function History() {
  const { allPledges } = useAppStatesContext();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.replace("/login");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.replace("/login");
  }, []);
  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < allPledges.length; i++) {
      if (allPledges[i].completed) tmp.push(allPledges[i]);
    }
    setHistory(tmp);
  }, [allPledges]);

  return (
    <main id={styles.history}>
      <div className={styles.ongoingPledges}>
        <div className={styles.title}>History</div>
        <div className={styles.wrapper}>
          {history.map((each, idx) => {
            return <HistoryWidget key={each._id} content={each} />;
          })}
        </div>
      </div>
    </main>
  );
}
