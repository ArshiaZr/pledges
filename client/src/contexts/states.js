"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext();

export function AppStates({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [addReveal, setAddReveal] = useState(false);
  const [editReveal, setEditReveal] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [allPledges, setAllPledges] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [balance, setBalance] = useState(0);

  const addAlert = ({ message, type, time }) => {
    let tmp = [...alerts];
    tmp.push({
      message,
      type,
      time,
    });
    setAlerts(tmp);
  };

  const getPledges = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5001/pledge", {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          setAllPledges(res.data.pledges);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getBalance = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5001/user/balance", {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          console.log(res.data.balance);
          setBalance(res.data.balance);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getPledges();
    getBalance();
  }, []);

  return (
    <Context.Provider
      value={{
        alerts,
        setAlerts,
        addAlert,
        addReveal,
        setAddReveal,
        editReveal,
        setEditReveal,
        editContent,
        setEditContent,
        allPledges,
        setAllPledges,
        getPledges,
        currentLocation,
        setCurrentLocation,
        balance,
        setBalance,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppStatesContext() {
  return useContext(Context);
}
