"use client"
import { createContext, useContext, useState } from 'react';

const userData = createContext();

// TODO: need to reset trip data context between trip creations
export const userDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    
  });

  return (
    <userData.Provider value={{ userData, setUserData }}>
      {children}
    </userData.Provider>
  );
};

export const useUserData = () => useContext(userData);