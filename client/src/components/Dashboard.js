import React, { Component } from 'react'

export default class Dashboard extends Component {
  onSubmit(e) {
    e.preventDefault()
    var order = {
      entree: this.refs.entree.value,
      instructions: this.refs.instructions.value
    }
    console.log(order)
  }
  render() {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <div>
          <h3>Some admin stuff here</h3>
        </div>
      </div>
    )
  }
}
