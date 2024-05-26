import React from 'react'
import { useEffect, useState } from 'react'

type Props = {
  // start: boolean,
  localCountedVal: string | null,
  localCountedKey: string
}

const Timer = (props: Props) => {

  // 経過時間をミリ秒で格納
  // const [time, setTime] = useState<number>(0)
  const [time, setTime] = useState<number>(Number(props.localCountedVal))
  // 経過したミリ秒の数値をローカル(出来ればindexedDB)に毎秒保存(更新していく)
  // アプリを閉じて再度立ち上げた際に
  // ローカルに保存してあるミリ秒をtimeに代入して
  // 続きをカウントし始める←ここまで出来た

  // 完成形は閉じて再び立ち上げる間の時間も加算してカウントする

  // timeの値をトリガーにして毎秒1000ミリ秒を加算していく
  // 次はここから
  // useEffectのテストとして https://qiita.com/c_hazama/items/59dfc0de28bbf0ae6d31 のコードをパクって
  // 別コンポーネントに切り分けてstartの真偽値で実行をコントロールしてみる
  useEffect(() => {
    // if (props.start) {
    //   console.log("スタートしました")
    // } else {
    //   console.log("リセットしました")
    // }
    const count = setInterval(() => {
      const tmpTime = time + 1000
      localStorage.setItem(props.localCountedKey, tmpTime.toString())
      setTime(tmpTime)
    }, 1000)

    // なぜreturn と clearIntervalが必要なのかを後で調べておく
    return () => clearInterval(count)
    // 依存配列にprops.localKeyとprops.startを追加しないと警告が出る(エラーではない)
  }, [
    time,
    props.localCountedKey,
    // props.start
  ])

  const modifyMilliSeconds = (unix: number, milliSec: number): Array<number> => {
    // 渡されたミリ秒(unix)を各時間の単位のミリ秒(milliSec)で割る
    const unitOfTime = Math.floor(unix / milliSec)
    if (unitOfTime >= 1) {
      // unitOfTimeが1以上
      return [unitOfTime, unix - unitOfTime * milliSec]
    } else {
      // unitOfTimeが1以下
      return [0, unix]
    }
  }

  const millisecondsTest = (uni: number): string => {
    // 渡されたtimeを各ミリ秒で除算 ex) uni / 31536000000 = x.xxxx
    // 秒以外で答えが1以上なら余りを四捨五入して対応するミリ秒を乗算し、timeから減算 ex) uni - 31536000000 * x = y
    // 減算の答えを次に回していく

    // 残り≠余り
    // (年) 31536000000で割って1以下なら0、1以上なら残りを
    // (月) 2592000000で割って1以下なら0、1以上なら残りを
    // (週) 604800000で割って1以下なら0、1以上なら残りを
    // [年、月、週はやっぱり要らない]
    // (日) 86400000で割って1以下なら0、1以上なら残りを
    const tmpDay: Array<number> | number = modifyMilliSeconds(uni, 86400000)
    const returnDay: number = tmpDay[0]
    // (時) 3600000で割って1以下なら0、1以上なら残りを
    const tmpHour: Array<number> | number = modifyMilliSeconds(tmpDay[1], 3600000)
    const returnHour: number = tmpHour[0]
    // (分) 60000で割って1以下なら0、1以上なら残りを
    const tmpMinutes: Array<number> | number = modifyMilliSeconds(tmpHour[1], 60000)
    const returnMinutes: number = tmpMinutes[0]
    // (秒) 1000で割る
    const returnSeconds: number = tmpMinutes[1] / 1000 

    return `${returnDay}日${returnHour}時間${returnMinutes}分${returnSeconds.toString()}秒`
  }

  return (
    <>
      <h2>setIntervalテスト {millisecondsTest(time)}</h2>
    </>
  )
}

export default Timer