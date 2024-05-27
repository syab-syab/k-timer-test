import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';
// import Test from './components/Test';
import localSetItem from './functions/localSetItem';
// import millisecondsTest from './functions/millisecondsTest';
import milliSecEdit from './functions/milliSecEdit';

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
  // 取得したミリ秒の下三桁を000に直してからローカルへ格納
  localSetItem(currentMilliKey, milliSecEdit(currentMilliSeconds.toString()))
  const currentMilliSecondsVal: number = Number(localStorage.getItem(currentMilliKey))
  // console.log("現在", new Date(currentMilliSecondsVal))

  
  // カウントを開始した時刻(日付)のミリ秒を格納する
  const countStartMilliKey = "count-start-milli-seconds-test"
  // カウント開始時のミリ秒を格納する定数を用意
  const countStartMilliSeconds: string | null = localStorage.getItem(countStartMilliKey)
  // ローカルに開始ミリ秒の値があるか存在を確認
  // const localStartCheck = (valid: string | null): void => {
  //   if (valid) {
  //     console.log("start値有り")
  //   } else {
  //     console.log("start値無し")
  //     localSetItem(countStartMilliKey, String(Date.now()))
  //   }
  // }


  // ボタンの状態
  // ローカルにボタンの状態を保存しておく
  const localStartBooleanKey: string = "local-start-boolean-test"
  const localStartBooleanval: string | null = localStorage.getItem(localStartBooleanKey)

  const localBoolCheck = (valid: string | null): void => {
    if (valid) {
      console.log("start有")
      // start有りでなおかつカウント開始時の値が無い場合は現在のミリ秒を代入
      // localStartCheck(countStartMilliSeconds)
    } else {
      console.log("start無")
      localSetItem(localStartBooleanKey, "0")
      // リセットが押されたら開始時のミリ秒も0にする
      // localSetItem(countStartMilliKey, "0")
    }
  }
  localBoolCheck(localStartBooleanval)


  // 文字列→数値→booleanに変える
  const [start, setStart] = useState<boolean>(Boolean(Number(localStartBooleanval)))
  const [reset, setReset] = useState<boolean>(!start)
  // setStateが要らなくなってしまった問題をどうにかする


  // スタートしたらカウントを始める
  const clickStart = (): void => {
    setStart(true)
    localSetItem(localStartBooleanKey, "1")
    // start有りでなおかつカウント開始時の値が無い場合は現在のミリ秒を代入
    // localStartCheck(countStartMilliSeconds)
    localSetItem(countStartMilliKey, milliSecEdit(String(Date.now())))
    setReset(false)
  }

  const clickReset = (): void => {
    // たぶんalertやconfirmを使うとカウントが途中で止まるので
    // 自前でポップアップを用意する
    alert("本当にリセットしますか？")
    setStart(false)
    localSetItem(localStartBooleanKey, "0")
    // リセットが押されたら開始時のミリ秒も0にする
    localSetItem(countStartMilliKey, "0")
    setReset(true)
  }
  // ボタン関係に無駄があるので後でスッキリさせる

  
  // 現在のミリ秒とスタート時のミリ秒
  // ミリ秒の下3桁を000にしないと小数点が付くっぽい
  const tmpCurrent: number = Number(currentMilliSecondsVal)
  const tmpStart: number = Number(countStartMilliSeconds)
  // console.log("現在の方が開始時より大きい", tmpCurrent > tmpStart)
  // console.log("その差は", tmpCurrent - tmpStart)
  // console.log(millisecondsTest(tmpCurrent - tmpStart))
  
  // 基準となるカウント済みのミリ秒をローカルに保存
  const localCountedKey: string = "counted-milli-test"
  // ローカルの値を代入する定数を用意(これいらないかも)
  let localCountedVal: string | null = localStorage.getItem(localCountedKey)
  // ローカルの値の存在を確認
  const localCountedCheck = (valid: string | null): void => {
    // 数値の0はfalseと同じ(文字列はtrue)
    if (valid) {
      // console.log("counted有り")
      if(tmpCurrent > tmpStart) {
        // 10秒の時点で落としたから次はXX:X9に開く
        const currentStartDiff: string = String(tmpCurrent - tmpStart)
        localSetItem(localCountedKey, currentStartDiff)
        localCountedVal = currentStartDiff
      }
    } else {
      // console.log("counted無し")
      // もしカウント済みのミリ秒がローカルに無ければ
      // 0を格納しておく
      localSetItem(localCountedKey, "0")
    }
  }
  localCountedCheck(localCountedVal)
  console.log("localCountedVal = ", localCountedVal)

  // 2分45秒あたりから2秒ほど遅れがあるかも
  // 3分18秒あたりだと2秒どころか5秒以上も
  // ただし一度閉じて再度開くと直る
  // 再読み込みでも直る
  // ロジックは間違っていないっぽい

  return (
    <div className="App">
      <h1>我慢ズデイ・クロック-世界忍耐時計-テスト</h1>
      <Timer
        start={start}
        localCountedVal={localCountedVal}
        localCountedKey={localCountedKey}
      />
      <br />
      {/* <Test
        start={start}
      /> */}
      <br />
      <button onClick={clickStart} disabled={start}>start</button>
      <br />
      <button onClick={clickReset} disabled={reset}>reset</button>
    </div>
  );
}

export default App;
