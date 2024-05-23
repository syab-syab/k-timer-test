import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Stopwatch from './components/Stopwatch';


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
      <h1>我慢ズデイ・クロック-世界忍耐時計-テスト</h1>
      {/* <h2>time: { timeStamp }</h2> */}
      <Stopwatch />
    </div>
  );
}

export default App;
