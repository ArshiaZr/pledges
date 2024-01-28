import { useEffect } from "react";
import styles from "../../styles/AlertWrapper.module.scss";
import { useAppStatesContext } from "../../contexts/states";
import ModalText from "../ModalText";

export default function AlertWrapper() {
  const { alerts, setAlerts } = useAppStatesContext();

  useEffect(() => {
    if (alerts.length > 0) {
      const timeoutRemove = setTimeout(() => {
        let tmp = [...alerts];
        tmp.shift();
        setAlerts(tmp);
      }, alerts[0].time + 1000);

      return () => {
        clearTimeout(timeoutRemove);
      };
    }
  }, [alerts, setAlerts]);
  return (
    <div className={styles.alertWrapper}>
      {alerts.map((alert, idx) => {
        return (
          <ModalText
            key={idx}
            time={alert.time}
            message={alert.message}
            type={alert.type}
          />
        );
      })}
    </div>
  );
}
