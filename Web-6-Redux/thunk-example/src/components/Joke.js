import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJoke } from '../actions'
import './Joke.css'

class Joke extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { jokes } = this.props
        let joke = "Press the button"
        if (jokes.value) {
            joke = jokes.value.joke
        }

        console.log(jokes)
        return (
            <div>
                <div className='jokeDisplay'>{joke}</div>
                <button className='getJokeBtn' onClick={(e) => {this.props.getJoke()}}>Randomize Joke</button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        jokes: state.jokes
    }
}

const mapDispatchToProps = () => {
    return { getJoke }
}

export default connect(mapStateToProps, mapDispatchToProps())(Joke)