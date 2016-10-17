import React, { Component } from 'react'

export default class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const order = {
      restaurantId: this.props.restaurantId,
      item: this.refs.item.value,
      notes: this.refs.notes.value
    }

    this.props.submitEvent(order)
  }

  render() {
    return (
      <form className="form-horizontal">
        <fieldset>
          <legend>Order Form</legend>
          <div className="container">

            <div className="row">
              <div className="col-md-6">

                <div className="form-group">
                  <label htmlFor="item">Meal</label>
                  <input id="item"
                    ref="item"
                    type="text"
                    placeholder="garden salad"
                    className="form-control input-md"/>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <textarea id="notes"
                    ref="notes"
                    placeholder="side of buffalo sauce &amp; 1 Crystal Pepsi"
                    className="form-control input-md"></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <button type="button"
                  className="btn btn-primary pull-right"
                  onClick={this.onSubmit}>
                  Submit
                </button>
              </div>
            </div>

          </div>
        </fieldset>
      </form>
    )
  }
}

OrderForm.propTypes = {
  restaurantId: React.PropTypes.number.isRequired,
  submitEvent: React.PropTypes.func.isRequired
}
