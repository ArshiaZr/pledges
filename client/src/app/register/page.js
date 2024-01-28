"use client";
import styles from "../../styles/Register.module.scss";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [reveal, setReveal] = useState(false);
  let onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  let onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/user/register", { ...inputs })
      .then((res) => {
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main id={styles.register}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Register</div>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={onChange}
            />
            <div className={styles.icon}>
              <img src="/icons/personIcon.svg" alt="username icon" />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={reveal ? "text" : "password"}
              name="password"
              placeholder="password"
              onChange={onChange}
            />
            <div
              className={`${styles.icon} ${
                reveal ? styles.reveal : styles.lock
              }`}
              onClick={() => {
                setReveal(!reveal);
              }}
            >
              <img src="/icons/lockIcon.svg" alt="lock icon" />
              <img src="/icons/eyeIcon.svg" alt="open icon" />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
