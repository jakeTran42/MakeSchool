import React from 'react';
import './Timer.css';

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            time: 0,
            isRunning: false
        }
    }
}