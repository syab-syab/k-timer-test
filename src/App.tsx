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
  // 1分 = 60000ミリ秒
  // 1時間 = 3600000ミリ秒
  // 1日 = 86400000ミリ秒
  // 1週 = 604800000ミリ秒
  // 1月(30日) = 2592000000ミリ秒
  // 1年(暦年) = 31536000000ミリ秒

  // 経過時間をミリ秒で格納
  const [time, setTime] = useState<number>(0)

  // 年月日時分秒を
  // const [year, setYear] = useState<string>("00")
  // const [month, setMonth] = useState<string>("00")
  // const [day, setDay] = useState<string>("00")
  // const [hour, setHour] = useState<string>("00")
  // const [minutes, setMinutes] = useState<string>("00")
  // const [seconds, setSeconds] = useState<string>("00")

  // ボタンの状態
  const [startBtn, setStartBtn] = useState<boolean>(false)
  const [stopBtn, setStopBtn] = useState<boolean>(true)
  const [resetBtn, setResetBtn] = useState<boolean>(true)


  useEffect(() => {
    const cd = setInterval(() => {
      // setCount(prevCount => prevCount + 1)
      setTime(time+1000)

    }, 1000)

    return () => clearInterval(cd)
  }, [time])

  // スタートしたらカウントを始める
  const clickStart = (): void => {
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
      // const t: Date = new Date(time)
      // setYear(t.getFullYear().toString())
      // setMonth(t.getMonth().toString())
      // setDay(t.getDate().toString())
      // setHour(t.getHours().toString())
      // setMinutes(t.getMinutes().toString())
      // setSeconds(t.getSeconds().toString())
      // console.log(`${year}年 ${month}月 ${day}日 ${hour}時 ${minutes}分 ${seconds}秒`)
      // const tmpTime = time + 1000
      // console.log("tmpTime=", tmpTime)
      // setTime(tmpTime);
    }, 1000)
    console.log("外２")
  }

  const modifyMilliSeconds = (uni: number, milli: number): Array<number> => {
    // 渡されたミリ秒(uni)を各時間の単位のミリ秒(milli)で割る
    // const tmp = Math.floor(uni / milli)
    const tmp = Math.floor(uni / milli)
    if (tmp >= 1) {
      // tmpが1以上の時
      // 次ここから
      return [tmp, uni - tmp * milli]
    } else {
      return [0, uni]
    }
  }

  const millisecondsTest = (uni: number): string => {
    // 渡されたtimeを各ミリ秒で除算 ex) uni / 31536000000 = x.xxxx
    // 秒以外で答えが1以上なら余りを四捨五入して対応するミリ秒を乗算し、timeから減算 ex) uni - 31536000000 * x = y
    // 減算の答えを次に回していく

    // (年) 31536000000で割って1以下なら0、1以上なら残りを
    // (月) 2592000000で割って1以下なら0、1以上なら残りを
    // (週) 604800000で割って1以下なら0、1以上なら残りを
    // (日) 86400000で割って1以下なら0、1以上なら残りを
    // (時) 3600000で割って1以下なら0、1以上なら残りを
    const tmpHour: Array<number> | number = modifyMilliSeconds(uni, 3600000)
    const returnHour: number = tmpHour[0]
    // (分) 60000で割って1以下なら0、1以上なら残りを
    // const tmpMinutes: Array<number> | number = modifyMilliSeconds(uni, 60000)
    const tmpMinutes: Array<number> | number = modifyMilliSeconds(tmpHour[1], 60000)
    const returnMinutes: number = tmpMinutes[0]
    // (秒) 1000で割る
    const returnSeconds: number = tmpMinutes[1] / 1000 
    // 残り≠余り


    
    return `${returnHour}時間${returnMinutes}分${returnSeconds.toString()}秒`
  }

  return (
    <div className="App">
      <h1>我慢ズデイ・クロック-世界忍耐時計-テスト</h1>
      <h2>setIntervalテスト {millisecondsTest(time)}</h2>
      {/* <h2>time: { timeStamp }</h2> */}
      {/* <h2>{year}年 {month}月 {day}日 {hour}時 {minutes}分 {seconds}秒</h2> */}
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
