"use client";
import { useState } from "react";
import styles from "../styles/Modal.module.scss";
import axios from "axios";
import { useAppStatesContext } from "@/contexts/states";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import AutoCompleteInput from "./AutoCompleteInput";

export default function AddModal() {
  let { addReveal, setAddReveal, getPledges } = useAppStatesContext();
  const [inputs, setInputs] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [address, setAddress] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    let theDate = inputs.date;
    let hour = inputs.time.split(":")[0];
    let min = inputs.time.split(":")[1];

    theDate = new Date(
      theDate.getFullYear(),
      theDate.getMonth(),
      theDate.getDay(),
      parseInt(hour),
      parseInt(min)
    );

    let day = theDate.getUTCDate().toString().padStart(2, "0");
    let month = (theDate.getUTCMonth() + 1).toString().padStart(2, "0");
    let year = theDate.getUTCFullYear().toString().padStart(2, "0");
    hour = theDate.getUTCHours();
    min = theDate.getUTCMinutes();

    let dateDue = `${day}-${month}-${year},` + `${hour}:${min}:00`;

    axios
      .post(
        `http://localhost:5001/pledge`,
        {
          title: inputs.title,
          detail: inputs.detail,
          amount: inputs.amount,
          dateDue: dateDue,
          location: { name: address, type: "Point", coordinates },
          link: inputs.link,
          priority: inputs.priority,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        console.log(res);
        setAddReveal(false);
        getPledges();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // title, detail, link, priority
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <div className={`${styles.modal} ${addReveal ? styles.reveal : ""}`}>
      <div className={styles.header}>
        <div
          className={styles.close}
          onClick={() => {
            setInputs({});
            setAddReveal(false);
          }}
        >
          <img src="/icons/closeIcon.svg" alt="close" />
        </div>
        <button className={styles.submit} onClick={onSubmit}>
          Add
        </button>
      </div>
      <div className={styles.form}>
        <div className={`${styles.titleAndWrapper} ${styles.box}`}>
          <input
            type="text"
            name="title"
            onChange={onChange}
            placeholder="Title"
          />
          <textarea name="detail" onChange={onChange} placeholder="Detail" />
        </div>
        <div className={`${styles.amountWrapper} ${styles.box}`}>
          <div className={styles.title}>Amount</div>
          <input
            type="text"
            placeholder="$0.00"
            name="amount"
            onChange={(e) => {
              if (e.target.value[0] == "$")
                e.target.value = e.target.value.slice(1);
              if (isNaN(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
                e.target.value = "$" + e.target.value.toString();
                return;
              }
              setInputs({ ...inputs, amount: e.target.value });
              e.target.value = "$" + e.target.value.toString();
            }}
          />
        </div>
        <div className={`${styles.dateWrapper} ${styles.box}`}>
          <div className={styles.title}>Date</div>
          <div className={styles.calendar}>
            <Calendar
              name="date"
              onChange={(value, e) => {
                setInputs({ ...inputs, date: value });
              }}
            />
          </div>
        </div>
        <div className={`${styles.timeWrapper} ${styles.box}`}>
          <div className={styles.title}>Time</div>
          <input
            type="time"
            name="time"
            onChange={onChange}
            className={styles.time}
          />
        </div>
        <div className={`${styles.locationWrapper} ${styles.box}`}>
          <AutoCompleteInput
            setCoordinates={setCoordinates}
            setAddress={setAddress}
          />
          <div className={styles.title}>
            <div className={styles.icon}>
              <img src="/icons/locationIconGray.svg" />
              <img src="/icons/locationIcon.svg" />
            </div>
            Location
          </div>
        </div>
        <div className={styles.linkAndPriority}>
          <div className={`${styles.linkWrapper} ${styles.box}`}>
            <input
              type="text"
              name="link"
              placeholder="Enter link"
              onChange={onChange}
              className={styles.time}
            />
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src="/icons/linkIconGray.svg" />
                <img src="/icons/linkIcon.svg" />
              </div>
              Link
            </div>
          </div>
          <div className={`${styles.priorityWrapper} ${styles.box}`}>
            <select name="priority" defaultValue={-1} onChange={onChange}>
              <option value={-1}>choose:</option>
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
            <div className={styles.title}>Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
}
