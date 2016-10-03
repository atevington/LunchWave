import React, { Component } from 'react'

import PastOrders from './PastOrders'

export default class Dashboard extends Component {
  onSubmit(e) {
    e.preventDefault()
    var order = {
      item: this.refs.item.value,
      notes: this.refs.notes.value
    }
    console.log(order)
  }
  render() {
    return (
      <div>
        <PastOrders restaurantId={1}/>
        <form className="form-horizontal">
          <fieldset>
            <legend>Order Form</legend>
            <div className="container">

              <div className="row">
                <div className="col-md-6">

                  <div className="form-group">
                    <label htmlFor="item">Meal</label>
                    <input id="item"
                      name="item"
                      type="text"
                      placeholder="garden salad"
                      className="form-control input-md"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea id="notes"
                      name="notes"
                      placeholder="side of buffalo sauce &amp; 1 Crystal Pepsi"
                      className="form-control input-md"></textarea>
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <button type="button" className="btn btn-primary pull-right">Submit</button>
                </div>
              </div>

            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}
