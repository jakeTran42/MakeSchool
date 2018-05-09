import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddTimer from './components/AddTimer'
import Timers from './components/Timers'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { update } from './actions'

const store = createStore(reducers)

let lastUpdateTime = Date.now()

setInterval(() => {
  const now = Date.now()
  const deltaTime = now - lastUpdateTime
  lastUpdateTime = now
  store.dispatch(update(deltaTime))
}, 50)

class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <AddTimer />
          <Timers />
        </div>

      </Provider>
    );
  }
}

export default App;
