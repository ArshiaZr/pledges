"use client";
import { useEffect, useState } from "react";
import OngoingWidget from "../Components/OngoingWidget";
import styles from "../styles/Home.module.scss";
import { useAppStatesContext } from "@/contexts/states";
import axios from "axios";

export default function Home() {
  const { allPledges, currenLocation, getPledges, balance } =
    useAppStatesContext();
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

  const completePledges = () => {
    let coordinates = undefined;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          coordinates = [latitude, longitude];
        },
        function (error) {
          console.log("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }

    const token = localStorage.getItem("token");
    if (coordinates && token)
      axios
        .post(
          "http://localhost:5001/pledge/check",
          {
            // coordinates: coordinates,
            coordinates: [43.657095, -79.3778373],
          },
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((res) => {
          console.log(res);
          getPledges();
        })
        .catch((err) => {
          console.log(err);
        });
  };

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
      <div className={styles.completePledgesWrapper}>
        <button className={styles.completePledges} onClick={completePledges}>
          Complete pledges
        </button>

        <div>Balance: {balance}</div>
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
