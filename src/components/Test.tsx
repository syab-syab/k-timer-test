import React, { useEffect, useState } from 'react'

// ここだと一度だけ
// console.log("test[外]")

type Props = {
  start: boolean
}

const Test = (props: Props) => {
  // ここだと親コンポーネントのがレンダリングされるたびに表示される
  // console.log("test[中]")

  // https://qiita.com/c_hazama/items/59dfc0de28bbf0ae6d31 の記事より
  const [time, setTime] = useState(60)

  useEffect(() => {
    const intervalId: NodeJS.Timer = setInterval(() => 
      time === 0 ? clearInterval(intervalId) : setTime(time - 1)
    , 1000);
    if (props.start) {
      console.log("スタートしました")
    } else {
      console.log("リセットしました")
      clearInterval(intervalId)
      setTime(60)
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [time, props.start]);

  return (
    <div>あと {time}秒</div>
  )
}

export default Test