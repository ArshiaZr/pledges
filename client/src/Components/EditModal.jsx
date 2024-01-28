"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.scss";
import axios from "axios";
import { useAppStatesContext } from "@/contexts/states";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export default function EditModal() {
  let { editReveal, setEditReveal, editContent, setEditContent } =
    useAppStatesContext();
  const [inputs, setInputs] = useState({});

  const titleRef = useRef(null);
  const detailRef = useRef(null);
  const amountRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const locationRef = useRef(null);
  const linkRef = useRef(null);
  const priorityRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    let day = editContent.date.getDay().toString().padStart(2, "0");
    let month = editContent.date.getMonth().toString().padStart(2, "0");
    let year = editContent.date.getFullYear().toString().padStart(2, "0");

    let dateDue = `${day}-${month}-${year},` + editContent.time;

    axios
      .put(`http://localhost:5001/pledge/${editContent._id}`, {
        title: editContent.title,
        detail: editContent.detail,
        amount: editContent.amount,
        dateDue: dateDue,
        location: editContent.location,
        link: editContent.link,
        priority: editContent.priority,
      })
      .then((res) => {
        setEditContent({});
        setEditReveal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInputs({
      title: editContent.title,
      detail: editContent.detail,
      amount: editContent.amount,
      date: editContent.date,
      time: editContent.time,
      location: editContent.location,
      link: editContent.link,
      priority: editContent.priority,
    });
    titleRef.current.value = editContent.title;
    detailRef.current.value = editContent.detail;
    amountRef.current.value = "$" + editContent.amount;
    // dateRef.current.value = editContent.date;
    timeRef.current.value = editContent.time;
    locationRef.current.value = editContent.location;
    linkRef.current.value = editContent.link;
    priorityRef.current.value = editContent.priority;
  }, [editContent]);

  // title, detail, link, priority
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <div className={`${styles.modal} ${editReveal ? styles.reveal : ""}`}>
      <div className={styles.header}>
        <div
          className={styles.close}
          onClick={() => {
            setInputs({});
            setEditReveal(false);
          }}
        >
          <img src="/icons/closeIcon.svg" alt="close" />
        </div>
        <button className={styles.submit} onClick={onSubmit}>
          Edit
        </button>
      </div>
      <div className={styles.form}>
        <div className={`${styles.titleAndWrapper} ${styles.box}`}>
          <input
            ref={titleRef}
            type="text"
            name="title"
            onChange={onChange}
            placeholder="Title"
          />
          <textarea
            ref={detailRef}
            name="detail"
            onChange={onChange}
            placeholder="Detail"
          />
        </div>
        <div className={`${styles.amountWrapper} ${styles.box}`}>
          <div className={styles.title}>Amount</div>
          <input
            disabled
            ref={amountRef}
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
            disabled
            ref={timeRef}
            type="time"
            name="time"
            onChange={onChange}
            className={styles.time}
          />
        </div>
        <div className={`${styles.locationWrapper} ${styles.box}`}>
          <input
            disabled
            ref={locationRef}
            type="text"
            name="location"
            placeholder="Enter location"
            onChange={onChange}
            className={styles.time}
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
              ref={linkRef}
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
            <select
              ref={priorityRef}
              name="priority"
              defaultValue={-1}
              onChange={onChange}
            >
              <option disabled value={-1}>
                choose:
              </option>
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
