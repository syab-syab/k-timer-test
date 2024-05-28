import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';
// import Test from './components/Test';
import localSetItem from './functions/localSetItem';
// import millisecondsTest from './functions/millisecondsTest';
import milliSecEdit from './functions/milliSecEdit';
import DeadlineCheck from './components/DeadlineCheck';

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
  // console.log("localCountedVal = ", localCountedVal)

  // 2分45秒あたりから2秒ほど遅れがあるかも
  // 3分18秒あたりだと2秒どころか5秒以上も
  // ただし一度閉じて再度開くと直る
  // 再読み込みでも直る
  // ロジックは間違っていないっぽい


  // 目標の期限設定
  const localDedlineKey: string = "dedline-test"
  // 単位を乗算する前の数値(〇時間, 〇日)
  const localDeadLineOriginKey: string = "dedline-origin-test"
  // いずれは自由に選択できるようにするけどひとまず固定
  // const tmpDedlineMilliSec: number = new Date(2024, 4, 28, 5, 22).getTime()

  // 実際の期限設定
  // state使う必要無いかも
  const localDeadLineOrigin: string | null = localStorage.getItem(localDeadLineOriginKey)
  // ローカルに期限のミリ秒が存在するかチェック
  const localDeadLineCheck = (valid: string | null): void => {
    // 数値の0はfalseと同じ(文字列はtrue)
    if (valid) {
      console.log("deadLine有り")
    } else {
      console.log("deadLine無し")
      // もし期限のミリ秒がローカルに無ければ
      // 0を格納しておく
      localSetItem(localDeadLineOriginKey, "0")
    }
  }
  localDeadLineCheck(localDeadLineOrigin)
  // 期限のstate
  const [deadLine, setDeadLine] = useState<number>(Number(localDeadLineOrigin))

  const changeDeadLine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tmp: number = Number(e.target.value)
    setDeadLine(tmp)
  }
  console.log("期限 = ", deadLine)
  // いずれ日(86400000ミリ秒単位)に直す↓
  console.log("期限ミリ秒(hour) = ", tmpStart + (deadLine * 3600000))
  // 設定した期限ミリ秒をスタートしたミリ秒に加算して期限(dedline-test)としてローカルに格納
  // ↓みたいな感じ、多分
  // localSetItem(localDedlineKey, (tmpStart + (deadLine * 86400000)).toString())
  const clickDeadLineDecide = (): void => {
    // テスト環境で日では長いので時間を使う
    localSetItem(localDeadLineOriginKey, deadLine.toString())
    // ここで初めて乗算したミリ秒の期限を格納
    localSetItem(localDedlineKey, (tmpStart + (deadLine * 3600000)).toString())
  }
  // テスト環境で日では長いので時間を使う
  // localSetItem(localDeadLineOriginKey, deadLine.toString())
  // ここで初めて乗算したミリ秒の期限を格納
  // localSetItem(localDedlineKey, (tmpStart + (deadLine * 3600000)).toString())
  const localDeadLine: number = Number(localStorage.getItem(localDedlineKey))
  
  // 何の数値を期限と比較すればいいのかは次にやる
  // (デッドライン - スタート開始ミリ秒) > (現在のミリ秒 - スタート開始ミリ秒) という感じか
  // (デッドライン - スタート開始ミリ秒) > カウント済みのミリ秒
  // console.log("deadline = ", deadLineMilliSec)
  // console.log("スタートミリ秒 = ", tmpStart)
  // console.log("デッドライン - スタート開始ミリ秒", deadLineMilliSec - tmpStart)

  // これだとリアルタイムで更新できないから
  // 本番ではstateの値で比較する
  console.log("カウント済みのミリ秒 > (デッドライン - スタート開始ミリ秒)", (tmpCurrent - tmpStart) >= (localDeadLine - tmpStart))

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
      <DeadlineCheck
        deadline={localDeadLine - tmpStart}
        // とりあえず現在時間を入れておく(後で変える)
        tmp={tmpCurrent - tmpStart}
      />
      <hr />
      <div>
        何時間耐える？
        <input type='number' value={deadLine} onChange={(e) => changeDeadLine(e)}/>
        {/* 本番ではstartのボタンを押したときに設定するようにする */}
        <button onClick={clickDeadLineDecide}>設定</button>
      </div>
    </div>
  );
}

export default App;
