import React, { useState, useEffect } from 'react';
import './clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  const formatTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let session = 'AM';

    if (hours === 0) {
      hours = 12;
    }

    if (hours > 12) {
      hours = hours - 12;
      session = 'PM';
    }

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + ' ' + session;
  };

  return (
    <div className="clock">
      {formatTime(time)}
    </div>
  );
};

export default Clock;
