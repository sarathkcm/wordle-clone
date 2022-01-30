import React, { useEffect, useState } from 'react';
import Game from './game';
const notyf = new Notyf({
  position: { x: 'center', y: 'top' }
});
export function App() {
  const [data, setData] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  const getDataFromStorage = (() => {
    try {
      return JSON.parse(window.localStorage.getItem("__data") || {})
    } catch (error) {
      console.log("Error loding data", error)
      return {}
    }
  })

  useEffect(() => {
    const initialData = getDataFromStorage();

    setData({ ...initialData });
  }, []);

  if (!data) {
    return null;
  }

  const onChange = (data) => {

    if (startTime < getDataFromStorage().startTime) {
      notyf.error("You have opened the game in multiple tabs, please refresh this page to sync the latest score")
      return;
    }
    const stringified = JSON.stringify({ ...data, startTime });
    window.localStorage.setItem("__data", stringified);
  }

  return <Game initialData={data} onChange={data => onChange(data)} />;
}
