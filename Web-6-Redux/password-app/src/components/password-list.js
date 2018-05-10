import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePassword } from '../actions'
import './password-list.css';


class PasswordList extends Component {

  getList() {
    return this.props.passwords.map((pass, index) => {
      return (
        <div className='savedPasswordContainer' key={index}>
          <h1>No.</h1><span>{index+1}</span> 
          <h1>Name</h1> <span>{pass.name}</span> 
          <h1>Password</h1> <span>{pass.password}</span> 
          <h1>Strength</h1> <span>{pass.rating}</span>
          <h4 className='delete-btn' onClick={(e) => {this.props.deletePassword(index)}}>Delete</h4>
        </div>
        )

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

const mapDispatchToProps = () => {
  return {
    deletePassword
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(PasswordList)