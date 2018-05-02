import React, { Component } from 'react';
import './password.css';
import { connect } from 'react-redux';
import { addPassword } from '../actions';
import zxcvbn from 'zxcvbn';

class Password extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            password: '',
            name: '',
            rating: 0
        }
    }


    generatePasswordv1 = () => {
        var newPassword = ''
        for (let i=0; i<8; i++){
            newPassword += String.fromCharCode(Math.floor(Math.random() * 94) + 33)
        }
        this.setState({password: newPassword})
        
    }

    generatePasswordv2 = () => {
        var newPassword = ''
        const password_list = ['!', '@', '#', '%', '$', '&', 1, 2, 3, 4, 5, 6, 7, 8, 9,
                        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (let i=1; i<12; i++) {
            newPassword += password_list[Math.floor(Math.random() * password_list.length)]
            if (i%4 === 0) {
                var replacePass = newPassword.split('')
                replacePass[i-1] = '-'
                newPassword = replacePass.join('')
            }
        }
        this.setState({password: newPassword, rating: zxcvbn(newPassword).score} )      

    }

    ratePasswordHandler = () => {
        const evaluate = zxcvbn(this.state.password)
        this.setState({rating: evaluate.score})
    }

    passwordChange = (e) => {
        this.setState({ password: e.target.value})
        const evaluate = zxcvbn(this.state.password)
        this.setState({rating: evaluate.score})
    }



    render () {
        return (
            <div>
                <div className='displayContainer'>
                    <h1>{this.state.name}</h1>
                    <h1>{this.state.password}</h1>
                </div>
        
                <div className='inputContainer'>

                    <div className='nameInput'>
                        <input
                            type='text'
                            onChange={(e) => {this.setState({ name: e.target.value })}}
                            value={this.state.name}
                            placeholder={'Name'}
                        />
                    </div>

                    <div className='passwordContainer'>

                        <div className='passAndStr'>

                            <input
                                type='text'
                                className='passInput'
                                onChange={(e) => this.passwordChange(e)}
                                value={this.state.password}
                                placeholder={'Password'}
                            />

                            <h1 className='str'>
                                Strength: {this.state.rating}
                            </h1>
                        </div>

                    </div>

                    <button onClick={this.generatePasswordv2} className='generateBtn'>
                            Generate
                    </button>
                    
                </div>

                <div>
                    <button className='saveBtn' onClick={(e) => {
                        this.props.addPassword(this.state.name, this.state.password, this.state.rating) }}> Save
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
  
    }
  }
  
const mapDispatchToProps = () => {
    return {
        addPassword
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Password)