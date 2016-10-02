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
        <h1>Restaurant Name</h1>
        <form className="form-horizontal">
        <fieldset>

          <legend>Order Form</legend>

          <div className="container">

            <div className="row">
              <div className="col-md-6">

                <div className="form-group">
                  <label className=""
                    htmlFor="Entrée">Entrée</label>
                  <input id="Entrée"
                    name="Entrée"
                    type="text"
                    placeholder="garden salad"
                    className="form-control input-md"/>
                </div>

                <div className="form-group">
                  <label className=""
                    htmlFor="soup">Soup</label>
                  <input id="soup"
                    name="soup"
                    type="text"
                    placeholder="wonton"
                    className="form-control input-md"/>
                </div>

                <div className="form-group">
                  <label className=""
                    htmlFor="extras">Extras</label>
                  <input id="extras"
                    name="extras"
                    type="text"
                    placeholder="side of buffalo sauce &amp; 1 Crystal Pepsi"
                    className="form-control input-md"/>
                </div>

              </div>
            </div>

            <div className="row">
              <div className="col-md-1 col-md-offset-5">
                <button type="button" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>

        </fieldset>
        </form>
      </div>
    )
  }
}
