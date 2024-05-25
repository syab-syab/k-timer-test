import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';

// やりたいこと
// 未来の日付を定める→その日付までのカウントダウンを表示する(目標まであと○○年○○月○○日○○分○○秒みたいな)

// カウントダウンが無理ならスタートボタンをクリックして今○○年○○月○○日○○分○○秒みたいな感じでやりたい
// スタートした時間(a)と目標の時間(b)のそれぞれのunix時間を取得する
// aに1000ミリ秒を足した数値をnew Date()に入れて日付と時間を表示してそれを1秒ごとに表示する


function App() {
  // ローカル全消し(最終手段だから滅多なことで使わない)
  // localStorage.clear();

  // サイトを開いたときのミリ秒(開くたびに値を更新していく)
  const currentMilliSeconds: number = Date.now()
  const currentMilliKey = "current-milli-seconds-test"
  localStorage.setItem(currentMilliKey, currentMilliSeconds.toString())
  const currentMilliSecondsVal: number = Number(localStorage.getItem(currentMilliKey))
  console.log("現在", new Date(currentMilliSecondsVal))


  // カウントを開始した時刻(日付)のミリ秒を格納する


  // 基準となるカウント済みのミリ秒をローカルに保存
  const localCountedKey: string = "counted-milli-test"
  // ローカルの値を代入する定数を用意
  const localCountedVal: string | null = localStorage.getItem(localCountedKey)
  
  // ローカルの値の存在を確認
  const localCountedCheck = (valid: string | null): void => {
    // 数値の0はfalseと同じ(文字列はtrue)
    if (valid) {
      console.log("counted有り")
    } else {
      console.log("counted無し")
      // もしカウント済みのミリ秒がローカルになければ
      // 0を格納しておく
      localStorage.setItem(localCountedKey, "0")
    }
  }
  localCountedCheck(localCountedVal)
  

  // ボタンの状態
  // ローカルにボタンの状態を保存しておく
  const localStartBooleanKey: string = "local-start-boolean-test"
  const localStartBooleanval: string | null = localStorage.getItem(localStartBooleanKey)

  const localStartCheck = (valid: string | null): void => {
    if (valid) {
      console.log("start有")
    } else {
      console.log("start無")
      localStorage.setItem(localStartBooleanKey, "0")
    }
  }
  localStartCheck(localStartBooleanval)

  // 文字列→数値→booleanに変える
  const [start, setStart] = useState<boolean>(Boolean(Number(localStartBooleanval)))
  const [reset, setReset] = useState<boolean>(!start)
  // setStateが要らなくなってしまった問題をどうにかする

  // const startBoolean: boolean = Boolean(Number(localStartBooleanval))
  // const resetBoolean: boolean = !startBoolean


  // スタートしたらカウントを始める
  const clickStart = (): void => {
    setStart(true)
    localStorage.setItem(localStartBooleanKey, "1")
    setReset(false)
  }

  const clickReset = (): void => {
    setStart(false)
    localStorage.setItem(localStartBooleanKey, "0")
    setReset(true)
    alert("本当にリセットしますか？")
  }

  // ボタン関係に無駄があるので後でスッキリさせる
  // 次はここから

  return (
    <div className="App">
      <h1>我慢ズデイ・クロック-世界忍耐時計-テスト</h1>
      {/* <h2>setIntervalテスト {millisecondsTest(time)}</h2> */}
      <Timer
        start={start}
        localCountedVal={localCountedVal}
        localCountedKey={localCountedKey}
      />
      <br />
      <button onClick={clickStart} disabled={start}>start</button>
      <br />
      <button onClick={clickReset} disabled={reset}>reset</button>
    </div>
  );
}

export default App;
