import React from 'react'

type Props = {
  deadline: number,
  tmp : number
}

// 期限を過ぎているか否かで表示を変える
const DeadlineCheck = (props: Props) => {
  let serif = ""
  if (props.tmp >= props.deadline) {
    serif = "目標達成おめでとう"
  } else {
    serif = "まだまだ頑張れ"
  }
  return (
    <div>{serif}</div>
  )
}

export default DeadlineCheck