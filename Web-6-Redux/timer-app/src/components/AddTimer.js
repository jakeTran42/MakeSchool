import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTimer } from '../actions'
import './AddTimer.css'

class NewTimer extends Component {
    constructor(props) {
      super(props)
  
      // Store the name of of input name below on state
      this.state = {
          name: ''
      }
    }

    addTimerhandler = (e) => {
      {this.props.addTimer(this.state.name)}
      this.setState({name: ''})
    }
  
    render() {
      return (
        <div className='addTimerController'>
          {/* make this a controlled component */}
          <input
           type='text'
           name="name"
           onChange={(e) => {this.setState({ name: e.target.value })}}
           value={this.state.name}
           placeholder={'Timer\'s Name'} />
           
          {/* The save button should addTimer from props and pass the name from state */}
          <button onClick={(e) => this.addTimerhandler(e)}>
              Add</button>
        </div>
      )
    }
  }
  
  const mapStateToProps = (state) => {
    return {}
  }
  
  const mapDispatchToProps = () => {
    return { addTimer }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps())(NewTimer)