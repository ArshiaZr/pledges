'use client';

import React, { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

export default function Modal({ modal, setModal }) {
    
  const [pledgeData, setPledgeData] = useState({
    title: "",
    details: "",
    amount: 0.0,
    date: Date.now(),
    time: Date.now(),
    location: "",
    repeat: "",
    link: "",
    priority: "",
  });

  const [edit, setEdit] = useState(false);

  const inputStyle =
    "bg-[#2A2A2A] text-[#838383] p-4 rounded-lg border rounded-xl border-black w-full ";

  return (
    <>
      {modal && (
        edit ? (
          <EditModal
            pledgeData={pledgeData}
            setPledgeData={setPledgeData}
            setModal={setModal}
          />
        ) : (
          <AddModal
            pledgeData={pledgeData}
            setPledgeData={setPledgeData}
            setModal={setModal}
          />
        )
      )}
    </>
  );
}