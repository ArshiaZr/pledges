import React from 'react';

export const CheckButton = () => {
  const handleClick = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const userLocation = [latitude, longitude];

      const response = await fetch('http://localhost:5000/pledge/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLocation),
      });

      // Handle the response here
    } catch (error) {
      // Handle any errors here
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Check</button>
    </div>
  );
};