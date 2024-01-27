'use client';

import React, { useState } from "react";

export default function Modal(){
    const [pledgeData, setPledgeData] = useState({
        title: "",
        details: "",
        amount: 0.00,
        date: Date.now(),
        time: Date.now(),
        location: "",
        repeat: "",
        link : "",
        priority: "",
    });

    const inputStyle = "bg-[#2A2A2A] text-[#838383] p-3 rounded-lg border rounded-xl border-black w-full ";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#1e1E1E] rounded-3xl p-6 w-4/6">
      <span className=" p-1 px-4 cursor-pointer border rounded-full bg-[#838383]"> X </span>
        <div className=" pt-4 *:text-center">
          <div className='text-black'>
            <div className="bg-[#2A2A2A] text-[#838383] border rounded-xl flex flex-col mb-4 border-black">
              <input
                id="title"
                name="title"
                placeholder="Title"
                className=" bg-transparent p-2 border-b border-[#3F3F3F]" 
                type="text"
                onChange={e => setPledgeData((prev) => ({
                  ...prev,
                  title: e.target.value
                }))}/>
              <input
                id="Details"
                name="Details"
                className="bg-transparent p-2 h-20"
                placeholder="Details"
                onChange={e => setPledgeData((prev) => ({
                  ...prev,
                  details: e.target.value
                }))}/>

            </div>
            <div className="mb-4">
                <input
                    className={`${inputStyle} text-2xl`}
                    id="Amount"
                    name="Amount"
                    placeholder="$0.00"
                    type="text"
                    onChange={e => setPledgeData(prev => ({
                    ...prev,
                    amount: '$' + e.target.value.toString()
                }))}
                />
            </div>
            <div className="mb-4">
              <input
                className={inputStyle}
                id="date"
                name="date"
                placeholder="date"
                type="date"
                onChange={e => setPledgeData((prev) => ({
                  ...prev,
                  date: e.target.value
                }))}/>
            </div>
            <div className="mb-4">
              <input
                className={inputStyle}
                id="Time"
                name="Time"
                placeholder="Time"
                type="time"
                onChange={e => setPledgeData((prev) => ({
                  ...prev,
                  time: e.target.value
                }))}/>

            </div>
            <div className="mb-4">
              <input
                className={inputStyle}
                id="location"
                name="location"
                placeholder="location"
                type="text"
                onChange={e => setPledgeData((prev) => ({
                  ...prev,
                  location: e.target.value
                }))}/>
            </div>
        <div className="grid grid-rows-3">
            </div>
            <div className="mb-4">
              <textarea
                className={inputStyle}
                id="repeat"
                name="repeat"
                placeholder="repeat"
                type="option"
                onChange={e => setPledgeData((prev) => ({
                  ...prev,
                  description: e.target.value
                }))}
              />
            </div>
            <div className="mb-4">
              <input
                className={inputStyle}
                id="link"
                name="link"
                placeholder="link"
                type="text"
                onChange={e => setPledgeData((prev) => ({
                  ...prev,
                  link: e.target.value
                }))}/>
            </div>
            <div className="mb-4">
                <select
                    className={inputStyle}
                    id="priority"
                    name="priority"
                    onChange={e => setPledgeData(prev => ({
                    ...prev,
                    priority: e.target.value
                    }))}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                </div>
        </div>
            </div>
            
        </div>
      </div>
  );
}
