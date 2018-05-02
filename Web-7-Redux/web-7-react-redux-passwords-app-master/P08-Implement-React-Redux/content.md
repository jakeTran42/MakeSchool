---
title: "React Redux Implement React Redux"
slug: react--implement-redux-react-redux
---

# Implement React Redux

The following steps implement React Redux in a react project. 

## Add Redux

Import redux into your project. 

`npm i --save redux;`

This adds Redux as a dependancy to the project. There are a few more things we 
to set up before we can implement Redux in React. 

## Add react-redux 

Add react-redux as a dependancy. 

`npm i --save react-redux;`

## Create Actions 

Redux is very strict about how it allows state to be modified. 
Changes to state can only be implement through actions which 
you will define. 

Create a folder named: 'src/actions'

Create a file in this folder: 'src/actions/index.js'

Imagine you want to store and manage passwords in your app. 
The actions need to create new passwords, delete existing 
passwords, and update existing passwords. 

You will implement the store a following step. When get there 
the store will be defined as an array and each password will 
be stored at an index in that array. 

Define these actions in 'src/actions/index.js'

```JavaScript
export const ADD_PASSWORD = "ADD_PASSWORD"
export const EDIT_PASSWORD = "EDIT_PASSWORD"
export const DELETE_PASSWORD = "DELETE_PASSWORD"
```

These are the action types. 

Below this add some action creators. 

```JavaScript
export const addPassword = (name, password) => {
  return {
    type: ADD_PASSWORD,
    payload: { name, password }
  }
}

export const deletePassword = (index) => {
  return {
    type: DELETE_PASSWORD,
    payload: { index }
  }
}

export const editPassword = (index, name, password) => {
  return {
    type: EDIT_PASSWORD,
    payload: { index, name, password }
  }
}
```

These functions are the action creators. These are simple functions 
that return action objects. Every action object has a type, which 
is set to an action type, and a payload. Payload is a JS object 
with any properties. 


## Define a Reducer function 

Create a new folder: 'src/reducers'

Then add a new file to this folder: 'src/reducers/index.js'

Add another file: 'src/reducers/password-reducer.js'

In 'password-reducer.js' define a reducer function.

```JavaScript
import { ADD_PASSWORD, DELETE_PASSWORD, EDIT_PASSWORD } from '../actions'

const passwordReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_PASSWORD:
      const { name, password } = action.payload
      return [...state, { name, password }]

    case DELETE_PASSWORD:
      const { index } = action.payload
      return [...state.slice(0, index), ...state.slice(index + 1)]

    case EDIT_PASSWORD:
      return state.map((item, index) => {
        if (index !== action.payload.index) {
          return item
        }
        return { ...item, ...action.payload }
      })

    default:
      return state
  }
}

export default passwordReducer
```

This block of code imports the Action Types. 

It also defines the `passwordReducer` function. 

This function is responsible for providing the default value for state. 
The default state is defined here as the default value for the state
parameter. 

`const passwordReducer = (state = [], action) => {...`

The switch statement in the function handles each action type. 
Notice that each case returns state. State is an array and when 
state is modified rather modifying state each case returns a new 
copy of the array. 

This is a requirement for Redux! Any changes to state must produce
new state! You can not modify existing state. 

## Combining Reducers 

The store is a JavaScript object with properties that represent pieces 
of application state. Each reducer is responsible for managing one 
piece of state. 

Add the following to 'src/reducers/index.js'

```JavaScript
import { combineReducers } from 'redux'

import passwordReducer from './password-reducer'

export default combineReducers({
  passwords: passwordReducer
}
```

This imports the `combineReducers` method from 'react-redux' and the 
`passwordReducer` from 'src/reducers/password-reducer.js'

You call `combineReducers` the object that represents the store. In this case 
the store will hold the array of passwords under the key: 'passwords' and handle
changes to this piece of state with `passwordReducer`. 

## Provider

Provider is a React Component that provides access to the Redux store to 
it's child components. Provider is part of React Redux. 

Add this at the top of App.js. 

```JavaScript
import { createStore } from 'redux'
import { Provider } from 'react-redux'
```

Next import your reducers: 

`import reducers from './reducers'`

Now create a store from your reducers: 

`const store = createStore(reducers)`

Last, define the Provider for the App. This is a component that 
should be an ancestor to components that want access to the Store. 

```JSX
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Password />
        </div>
      </Provider>
    );
  }
}
```

At this stage you are implementing Redux and have defined a store. The 
next step will be to connect components to the store. 

## React Containers

Containers are components that are connected to the Redux store. Container 
Components recieve state in the form of props when the store is updated
and send actions to the dispatcher to trigger changes in state. 

To create a Container you need to connect a component to Redux via the 
`connect` method. 

## Connect method 

The connect method connected components to the redux store. To make this work you 
will use two methods: `mapStateToProps` and `mapDispatchToProps`. 

### mapStateToProps

The `mapStateToProps` method receives state from the Store as a prop and 
returns an object containing values to be passed to your container/component 
as props. 

### mapDispatchToProps

The `mapDispatchToProps` method maps the action creator methods you defined 
to props in your container/component. There is a little functional progrmming 
magic happening through this method. 

### connect method

The `connect` method connects your component, to state and action creators. 

## Password List 

This a component that will list all of the passwords in the store. 

Create a new component that will display a list of passwords. Create a new 
file: 'src/password-list.js'.

```JSX
import React, { Component } from 'react'
import { connect } from 'react-redux'

class PasswordList extends Component {

  getList() {
    return this.props.passwords.map((pass, index) => {
      return (
        <div key={index}>
          name:{pass.name} password: {pass.password}
        </div>)
    })
  }

  render() {
    return (
      <div>
        {this.getList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    passwords: state.passwords
  }
}

export default connect(mapStateToProps)(PasswordList)
```

This is the minimal component to display a list of passwords with thier names. 

The list of passwords is generated from the array of passwords in the redux store. 
This is passed through `mapStateToProps` to `this.props.passwords` in this component. 
The last line `export default connect(mapStateToProps)(PasswordList)` makes this 
possible. 

Notice, the last line is the default export, instead of exporting the class as 
usual. 

At this point there are no passwords in the list, so nothing is displayed. You
need to add passwords to the list. 

Modify `src/password.js` Password component. This component was not initially 
set as a container/component. You need to convert this component into a 
container. 

Import `connect` from 'react-redux' and `addPassword` from '../actions' at the 
top of the class. 

```JavaScript
import { connect } from 'react-redux'
import { addPassword } from '../actions'
```

Add `mapStateToProps` and `addDispatchToProps` at the bottom of the module. 

```JavaScript
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = () => {
  return {
    addPassword
  }
}
```

Last use `connect` to connect this component to Redux. 

Replace `export default Password` with: 

```JavaScript
export default connect(mapStateToProps, mapDispatchToProps())(Password)
```

Last, you want to save a password by calling the action creator: `addPassword`
with the name and password. 

Add a button that does this to render method: 

```JSX
<div>
  <button onClick={(e) => {
    this.props.addPassword(this.state.name, this.state.password)
  }}>Save</button>
</div>
```

## Testing your work

Clicking the 'Save' button should add a new password to the list. Doing this
should display the name and password to the PasswordList. 

## Resources

- 