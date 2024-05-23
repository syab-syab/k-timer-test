import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

// やりたいこと
// 未来の日付を定める→その日付までのカウントダウンを表示する(目標まであと○○年○○月○○日○○分○○秒みたいな)

// カウントダウンが無理ならスタートボタンをクリックして今○○年○○月○○日○○分○○秒みたいな感じでやりたい
// スタートした時間(a)と目標の時間(b)のそれぞれのunix時間を取得する
// aに1000ミリ秒を足した数値をnew Date()に入れて日付と時間を表示してそれを1秒ごとに表示する

function App() {
  // 例によってUNIX時間の数値を取得する
  // 1秒 = 1000ミリ秒

  // const d: Date = new Date()

  // 現在のunix時間を格納
  const [time, setTime] = useState<number>(0)

  // 念のため
  // const [date, setDate] = useState<Date>(new Date(time)) 

  // 年月日時分秒を
  const [year, setYear] = useState<string>("00")
  const [month, setMonth] = useState<string>("00")
  const [day, setDay] = useState<string>("00")
  const [hour, setHour] = useState<string>("00")
  const [minutes, setMinutes] = useState<string>("00")
  const [seconds, setSeconds] = useState<string>("00")

  // setIntervalを使っていると最初の一秒だけ表示されないから初期値に現在の時刻を入れておく
  // const [timeStamp, setTimestamp] = useState<string>(
  //   `${d.getHours().toString()}:${d.getMinutes().toString()}:${d.getSeconds().toString()}`
  // )

  // ボタンの状態
  const [startBtn, setStartBtn] = useState<boolean>(false)
  const [stopBtn, setStopBtn] = useState<boolean>(true)
  const [resetBtn, setResetBtn] = useState<boolean>(true)

  // スタートしたらカウントを始める
  const clickStart = (): void => {
    // startボタンをクリックした後timeのstateの更新のタイミングがずれていて
    // カウントが上手く行かない
    const uni = Date.now()
    setTime(uni)
    // const d = new Date(time)
    // console.log(d)
    setStartBtn(true)
    setStopBtn(false)
    setResetBtn(false)
    startTime()
  }

  const clickStop = (): void => {
    setStartBtn(false)
    setStopBtn(true)
    setResetBtn(false)
  }

  const clickReset = (): void => {
    setStartBtn(false)
    setStopBtn(true)
    setResetBtn(true)
  }

  // 1秒ずつカウントする関数
  const startTime = (): void => {
    console.log("外１")
    setInterval(() => {
      const t: Date = new Date(time)
      setYear(t.getFullYear().toString())
      setMonth(t.getMonth().toString())
      setDay(t.getDate().toString())
      setHour(t.getHours().toString())
      setMinutes(t.getMinutes().toString())
      setSeconds(t.getSeconds().toString())
      const tmpTime = time + 1000
      setTime(tmpTime);
      console.log("starttime")
    }, 1000)
    console.log("外２")
  }

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     const t: Date = new Date(time)
  //     const realTime: string = `
  //       ${t.getHours().toString()}:${t.getMinutes().toString()}:${t.getSeconds().toString()}
  //     `
  //     setTime(time + 1000);
  //   }, 1000)
  //   return () => clearInterval(id);
  // }, [time])


  return (
    <div className="App">
      <h1>我慢ズデイ・クロック-世界忍耐時計-テスト</h1>
      {/* <h2>time: { timeStamp }</h2> */}
      <h2>{year}年 {month}月 {day}日 {hour}時 {minutes}分 {seconds}秒</h2>
      <br />
      <button onClick={clickStart} disabled={startBtn}>start</button>
      <br />
      <button onClick={clickStop} disabled={stopBtn}>stop</button>
      <br />
      <button onClick={clickReset} disabled={resetBtn}>reset</button>
    </div>
  );
}

export default App;
