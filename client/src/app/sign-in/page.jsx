'use client';
import React, { useState } from 'react'

export default function SignIn() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleSignIn() {
        const response = await fetch("localhost:3000/user/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
        // do api req for sign 
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="bg-gray-200 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSignIn}
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}