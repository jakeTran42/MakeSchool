import React, { Component } from 'react';
import { connect } from 'react-redux';


class PasswordList extends Component {

  getList() {
    return this.props.passwords.map((pass, index) => {
      return (
        <div key={index}>
          Name: {pass.name} -- Password: {pass.password} -- Strength: {pass.rating}
        </div>)
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

export default connect(mapStateToProps)(PasswordList)