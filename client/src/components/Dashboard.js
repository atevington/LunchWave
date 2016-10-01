import React, { Component } from 'react'

export default class Dashboard extends Component {
  onSubmit(e) {
    e.preventDefault()
    var order = {
    	entree: this.refs.entree.value,
    	instructions: this.refs.instructions.value
    }
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You authenticated with both google and the api server</p>
        <div>
          <h3>Place Order Here</h3>
        	<form ref="orderForm" onSubmit={this.onSubmit}>
        	  <input type="text" size="50" ref="entree" placeholder="lunch"></input>
        	  <input type="text" size="50" ref="instructions" placeholder="special instructions"></input>
        	  <input type="button" className="" value="submit"></input>
        	</form>
        </div>
      </div>
    )
  }
}
