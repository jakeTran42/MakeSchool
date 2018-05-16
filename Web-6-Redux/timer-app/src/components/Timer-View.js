import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleTimer, startTimer, deleteTimer, stopTimer, resetTimer } from '../actions'
import './Timer-View.css'

class TimerView extends Component {
  constructor(props) {
    super(props)

  }

  padded_time = (time) => {
    if (time < 10 ) {
      time = '0' + time
    }
    return time
  }

  convertTime = () => {
    let seconds = Math.floor(this.props.timer.time / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours  = Math.floor(minutes / 60)
    return this.padded_time(hours % 60) + ':' + this.padded_time(minutes % 60) + ':' + this.padded_time(seconds % 60)
  }

  render() {
    return (
      <div>
        <h2>{this.props.timer.name}</h2>
        <h1>{this.convertTime()}</h1>
        <div className='timerController'>
            <div className='start-btn' onClick={(e) => {this.props.startTimer(this.props.index)}}>Start</div>
            <div className='stop-btn' onClick={(e) => {this.props.stopTimer(this.props.index)}}>Stop</div>
            <div className='toggle-btn' onClick={(e) => {this.props.toggleTimer(this.props.index)}}>Toggle</div>
            <div className='reset-btn' onClick={(e) => {this.props.resetTimer(this.props.index)}}>Reset</div>
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
  return { toggleTimer, startTimer, deleteTimer, stopTimer, resetTimer }
}

export default connect(mapStateToProps, mapDispatchToProps())(TimerView)