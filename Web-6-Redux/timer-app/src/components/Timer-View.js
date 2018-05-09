import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleTimer, startTimer, deleteTimer, stopTimer } from '../actions'
import './Timer-View.css'

class TimerView extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <h2>{this.props.timer.name}</h2>
        <h1>{this.props.timer.time}</h1>
        <div className='timerController'>
            <div className='start-btn' onClick={(e) => {this.props.startTimer(this.props.index)}}>Start</div>
            <div className='stop-btn' onClick={(e) => {this.props.stopTimer(this.props.index)}}>Stop</div>
            <div className='toggle-btn' onClick={(e) => {this.props.toggleTimer(this.props.index)}}>Toggle</div>
            <div className='delete-btn' onClick={(e) => {this.props.deleteTimer(this.props.index)}}>
              <div className='xtop'></div>
              <div className='xbottom'></div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = () => {
  return { toggleTimer, startTimer, deleteTimer, stopTimer }
}

export default connect(mapStateToProps, mapDispatchToProps())(TimerView)