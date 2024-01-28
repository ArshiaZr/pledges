"use client";
import styles from "../../styles/Login.module.scss";
import { useState } from "react";
import axios from "axios";

export default function Login() {
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
      .post("http://localhost:5000/user/login", { inputs })
      .then((res) => {
        console.log(res);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main id={styles.login}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Login</div>
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
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
