import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import logo from './logo.svg';
import './App.css';
import Password from './components/password'
import PasswordList from './components/password-list'

const store = createStore(reducers)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>

          <Password />

          <PasswordList />

        </div>
      </Provider>
    );
  }
}

export default App;
