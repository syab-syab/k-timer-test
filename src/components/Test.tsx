import React from 'react'

// ここだと一度だけ
console.log("test[外]")

const Test = () => {
  // ここだと親コンポーネントのがレンダリングされるたびに表示される
  // console.log("test[中]")
  return (
    <div>Test</div>
  )
}

export default Test