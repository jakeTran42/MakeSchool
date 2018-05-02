---
title: "React Redux React-Redux"
slug: react-redux-react-redux
---

# React Redux

React Redux is a library that connects Redux to your React 
applications. 

The React Redux library adds methods and React Components to 
make the job connecting React to Redux easier. 

Flux -> Redux -> Rect-Redux -> React

## Redux - Actions and Reducers

Redux stores Application state as a single JavaScript Object. We will 
call this the Store. 

The Store is updated by a function called a Reducer. The reducer 
takes the current Application state and an action as parameters
and returns a **new** state Object. 

Actions are JavaScript Objects that describe a change that should be 
made to state. 

A view might generate an Action which is sent to the dispatcher.
An Action Object has a type and a payload. Type is always a 
string. Payload can be any data the reducer might need to 
implement the action. 

![04-Actions-Object](./assets/04-Actions-Object.png)

Best practice says that we will use a function to generate Actions. 
An Action Creator is a function that generates action Objects. 

![05-Action-Creators](./assets/05-Action-Creators.png)

The dispatch calls the reducer with the current state and the Action. 
Reducers return new state after making any changes. 

![06-Dispatcher-Reducer](./assets/06-Dispatcher-Reducer.png)

The store is a JavaScript Object that holds application data. 

![07-Store](./assets/07-Store.png)

After the store is updated data is passed to views. React Redux 
passes data to views as props. 

![08-views](./assets/08-views.png)

## Implement React Redux

The following steps implement React Redux in a react project. 

### Add Redux

Import redux into your project. 

`npm i --save redux;`

This adds Redux as a dependancy to the project.

### Add react-redux 

Add react-redux as a dependancy. This is 'glue' that connects
Redux with React

`npm i --save react-redux;`

### Provider

Provider is a Component that provides access to the Redux store to 
it's child components. 

### Connect method 

The connect method connects components to the store for receiving 
state change updates through props, and faciltates sending actions 
to the dispatcher by providing those action creator methods 
through props. 

### mapStateToProps

The mapStateToProps function does exactly what it's name describes. 
It maps Application state, from the Redux Store, to props on a component.  

### mapDispatchToProps

The mapDispatchToProps is also aptly named. It maps action creators
to new functions that send actions to the dispatcher. Like 
mapStateToProps, mapDispatch to props maps these functions to props
in a component. 

## Resources

