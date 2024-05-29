// とりあえずindex-db-testのコードをコピペした
// 色々弄るのはまた後で
import React from 'react';
// import './App.css';
import Dexie, { Table } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react';

export interface Todo {
  id?: number;
  task: string;
  completed: boolean;
}

export class MySubClassedDexie extends Dexie {
  // 'todos' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  todos!: Table<Todo>;

  constructor() {
    // super()にデータベース名を渡す(多分)
    super('todoApp');
    // バージョンを指定する
    this.version(1).stores({
        // オブジェクトストア(todos)の設定をする
        // ++を付けることでオートインクリメントしプライマリーキーにする
      todos: '++id, task, completed'
    });
  }
}

const db = new MySubClassedDexie();

const { todos } = db

const DexieTest = () => {
  const [taskInput, setTaskInput] = useState<string>("")

  // データベース内のすべてのtodosのデータを取得して配列にする(？)
  // useLiveQueryはindexedDBのデータが更新されたときに再レンダリングする
  const allItems: Array<Todo> | any = useLiveQuery(() => todos.toArray(), [])

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    // デフォルトのリロードを防ぐ(？)
    e.preventDefault()
    // const taskField = document.querySelector('#taskInput')
    console.log('=====>', taskInput)

    // addでデータの追加
    await todos.add({
      // task: taskField['value'],
      task: taskInput,
      completed: false,
    })

    // taskField['value'] = ''
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
        <input
          type="text"
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