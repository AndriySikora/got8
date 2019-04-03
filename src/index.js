import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import './index.css';
import './App.css';
// import * as serviceWorker from './serviceWorker';

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    calculateExpiryDate();
  }, 1000);

  function calculateExpiryDate() {
   const eventDate = new Date("04/18/2019 08:00:00 PM").getTime();
   const now = new Date().getTime();
   const distance = eventDate - now;
   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((distance % (1000 * 60)) / 1000);
   if(seconds < 0) {
     console.log('finish');
   } else {
     setSeconds(seconds);
     setMinutes(minutes);
     setHours(hours);
     setDays(days);
   }
}


  return (
    <div className='header'>
      <h1 className='title'>Winter is comming in</h1>
      <div className='timeContainer'>
        <h1>{days} days</h1>:
        <h1>{hours} hours</h1>:
        <h1>{minutes} minutes</h1>:
        <h1>{seconds} seconds</h1>
      </div>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
