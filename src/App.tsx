import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  // 例によってUNIX時間の数値を取得する
  // 1秒 = 1000ミリ秒

  // const d: Date = new Date()

  // 現在のunix時間を格納
  // const [time, setTime] = useState<number>(d.getTime())

  // setIntervalを使っていると最初の一秒だけ表示されないから初期値に現在の時刻を入れておく
  // const [timeStamp, setTimestamp] = useState<string>(
  //   `${d.getHours().toString()}:${d.getMinutes().toString()}:${d.getSeconds().toString()}`
  // )

  const [clock, setClock] = useState<boolean>(false)

  const clockToggle = (): void => {
    setClock(!clock)
    console.log(clock)
    setStartTime(Date.now())
    displayTime()
  }

  // 時、分、秒
  const [hour, setHour] = useState<string>("00")
  const [minutes, setMinutes] = useState<string>("00")
  const [seconds, setSeconds] = useState<string>("00")

  const [startTime, setStartTime] = useState<number>(0)

  const displayTime = (): void => {
    const d: Date = new Date(Date.now() - startTime)
    setHour(String(d.getHours()-1).padStart(2, '0'))
    setMinutes(String(d.getMinutes()).padStart(2, '0'))
    setSeconds(String(d.getSeconds()).padStart(2, '0'))
    setTimeout(displayTime, 1000)
  }

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime(time + 1000);
  //     const t: Date = new Date()
  //     const realTime: string = `
  //       ${t.getHours().toString()}:${t.getMinutes().toString()}:${t.getSeconds().toString()}
  //     `
  //     setTimestamp(realTime)
  //   }, 1000)
  //   return () => clearInterval(id);
  // }, [time])


  return (
    <div className="App">
      <h1>我慢ズデイ・クロック-世界禁欲時計-テスト</h1>
      {/* <h2>time: { timeStamp }</h2> */}
      <h2>{hour}:{minutes}:{seconds}</h2>
      <button onClick={clockToggle}>clock!</button>
    </div>
  );
}

export default App;
