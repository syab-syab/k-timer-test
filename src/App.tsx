import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  // 例によってUNIX時間の数値を取得する
  // 1秒 = 1000ミリ秒

  const d: Date = new Date()

  const uni: number = d.getTime()

  const [time, setTime] = useState<number>(uni)

  const [timeStamp, setTimestamp] = useState<string>("")

  useEffect(() => {
    const id = setInterval(() => {
      setTime(time + 1000);
      const realTime: string = new Date(time).toString()
      setTimestamp(realTime)
    }, 1000)
    return () => clearInterval(id);
  }, [time])



  return (
    <div className="App">
      <h1>我慢sday Clock-世界禁欲時計-テスト</h1>
      <h2>time: { timeStamp }</h2>
    </div>
  );
}

export default App;
