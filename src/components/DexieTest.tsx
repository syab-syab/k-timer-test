// とりあえずindex-db-testのコードをコピペした
// 色々弄るのはまた後で
import React from 'react';
// import './App.css';
import Dexie, { Table } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react';


// 三つの型を定義する
// カウントを開始した時刻(日付)のミリ秒を格納する(CountStartSecとかそんな感じ)
// カウント済みのミリ秒(これだけTimer.tsxで使用)(CountedMilliSecみたいな感じ)
// 目標の期限(ミリ秒)(DeadlineSecのような感じ)
// 一気にすべてを定義すると大変そうだから
// まず↓のToDoを色々変えてやってみる

// Todoから型名を変える(忍耐、禁欲、我慢を表すモノ)
export interface Todo {
  id?: number;
  // taskは別名に変える(忍耐する事柄の名前)
  // task: string;
  task: number;
  // カウントを開始した時刻(日付)のミリ秒をnumber型で定義する
  // counted(仮): number;
  // completedは
  // もうカウントが終わったものをtrue
  // 現在カウント中のものをfalseにする
  // falseは常に一つのデータだけで
  // カウントが終了したtrueのモノは履歴として残す(削除可能にする)
  // 無理そうだった
  completed: boolean;
  // 目標を達成したか否かのプロパティも必要かもしれない
}

export class MySubClassedDexie extends Dexie {
  // 'todos' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  todos!: Table<Todo>;
  // ↑複数定義できるっぽい

  constructor() {
    // super()にデータベース名を渡す(多分)
    super('todoApp');
    // バージョンを指定する
    this.version(1).stores({
        // オブジェクトストア(todos)の設定をする
        // ++を付けることでオートインクリメントしプライマリーキーにする
      todos: '++id, task, completed'
      // 複数定義できる
    });
  }
}

const db = new MySubClassedDexie();

const { todos } = db

const DexieTest = () => {
  // stateはstring型のままだが
  // indexedDBに格納するときにnumber型に変える
  const [taskInput, setTaskInput] = useState<string>("")

  // データベース内のすべてのtodosのデータを取得して配列にする(？)
  // useLiveQueryはindexedDBのデータが更新されたときに再レンダリングする
  const allItems: Array<Todo> | any = useLiveQuery(() => todos.toArray(), [])

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのリロードを防ぐ(？)
    e.preventDefault()
    // const taskField = document.querySelector('#taskInput')
    console.log('=====>', Number(taskInput))

    if (Number.isNaN(Number(taskInput))) {
      alert('数字を入力しろ')
    } else {
      // addでデータの追加
      await todos.add({
        task: Number(taskInput),
        completed: false,
      })
    }

    // addでデータの追加
    // await todos.add({
    //   task: Number(taskInput),
    //   completed: false,
    // })

    setTaskInput("")
  }

  // deleteにプライマリーキーを指定して削除できる
  const deleteTask = async (id: number | undefined) => todos.delete(id)

  const toggleStatus = async (
    id: number | any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // updateは更新したいデータのプライマリーキーを第一引数に指定し
    // 第二引数に変更するプロパティとその値を指定する
    await todos.update( id, {completed: !!e.target.checked })
  }

  const taskInputHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskInput(e.target.value)
  }

  // whereでプロパティを指定してequqalsで値を指定すれば検索できるが
  // equalsはboolean値に対応していないっぽい(null、undefined、Objectsも未対応)
  // 加えて文字列の比較では大文字と小文字が区別される
  // const completedItems = todos.where('completed').equals(true).toArray()
  // filterで代用した方が楽かもしれない
  // const completedItems = allItems?.filter((item) => item.completed === true)
  // console.log(completedItems)
  return (
    <div className="container">
      <p>{taskInput}</p>
      <h3 className="teal-text center-align">Todo App</h3>
      <form className="add-item-form" onSubmit={(e) => addTask(e)}>
        {/* type="text"のまま半角数字のみを受け付けるようにしたい */}
        <input
          type="text"
          // 正規表現で0001とか0を最初に付けるのを入力できなくするか
          // そこだけ削除して1にしたいする
          // 時間は0～23までの間の数値をセレクトボックスで選ばせる
          // pattern="\d*"
          className="itemField"
          placeholder="What do you want to do today?"
          id="taskInput"
          value={taskInput}
          onChange={taskInputHandleChange}
          required
        />
        <button type="submit" className="waves-effect btn teal right">
          Add
        </button>
      </form>

      <div className="card white darken-1">
        <div className="card-content">
          {allItems?.map((item: Todo) => (
            <div className="row" key={item.id}>
              <p className="col s10">
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    className="checkbox-blue"
                    onChange={(e) => toggleStatus(item.id, e)}
                  />
                  {/* completedがtrueの場合のみ打ち消し線(strike-text)を付ける */}
                  <span className={`black-tex ${item.completed && 'strike-text'}`}>{item.task}</span>
                </label>
              </p>
              <i
                onClick={() => deleteTask(item.id)}
                className="col s2 material-icons delete-button"
              >
                delete
              </i>
            </div>            
          ))}
        </div>
      </div>

    </div>
  )
}

export default DexieTest