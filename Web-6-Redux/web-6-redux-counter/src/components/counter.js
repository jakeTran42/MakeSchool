import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter, incrementBy, decrementBy } from '../actions'

class Counter extends Component {

  constructor(props) {
    super(props)
    this.state = { 
        countBy: ''
    }
  }


  render() {
    return (
      <div>
        <h1>{this.props.counter}</h1>

        <button onClick={(e) => {
          this.props.incrementCounter()
        }}>Up</button>


        <button onClick={(e) => {
          this.props.decrementCounter()
        }}>Down</button>

        <button onClick={(e) => {
          this.props.resetCounter()
        }}>Reset</button>

        <button onClick={(e) => {
          this.props.incrementBy(Number(this.state.countBy))
        }}>AddBy</button>

        <button onClick={(e) => {
          this.props.decrementBy(Number(this.state.countBy))
        }}>SubBy</button>
        
        <input type="number"
        onChange={(e) => this.setState({countBy: e.target.value})}
        value={this.state.countBy}
        />


      </div>
    );
  }
}

// export default Counter;

const mapStateToProps = (state) => {
  return {counter: state.counter}
}

const mapDispatchToProps = () => {
  return { incrementCounter, decrementCounter, resetCounter, incrementBy, decrementBy }
}

// export default connect(mapStateToProps)(Counter);
export default connect(mapStateToProps, mapDispatchToProps())(Counter);
