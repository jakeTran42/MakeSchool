import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectTimer } from '../actions'
import './Timers.css'
import TimerView from './Timer-View'

class ListTimers extends Component {
  constructor(props) {
    super(props)

  }

  render() {

    const timer = this.props.timers.map((timer, i) => {
        return (
            <div className='eachTimer' key={i}>
                <TimerView timer={timer} index={this.props.selectTimer(i).payload.index} />
            </div>
        )
    })

    return (
      <div className='timerContainer'>
       {/* render timers here */}
       {timer}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { timers: state.timers }
}

const mapDispatchToProps = () => {
  return { selectTimer }
}

export default connect(mapStateToProps, mapDispatchToProps())(ListTimers)