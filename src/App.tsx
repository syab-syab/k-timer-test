import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const time: Date = new Date()
  console.log(typeof time)

  return (
    <div className="App">
      <h1>世界禁欲時計-Patienceday Clock(Doomsday Clockのパクり)-テスト</h1>
      {/* <h2>{new Date()}</h2> */}
    </div>
  );
}

export default App;
