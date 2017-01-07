import React, { PropTypes } from 'react'

const Success = ({ item, notes }) => {
  return (
    <div className="row">
      <div className="col-md-6 col-lg-6 col-md-offset-2 col-lg-offset-3">
        <div className="alert alert-success">
          <h4 className="alert-heading">Success!</h4>
          <p className="mb-0">Your order has been recorded:</p>
          <p className="mb-0"><strong>Item: </strong>{item}</p>
          <p className="mb-0"><strong>Notes: </strong>{notes}</p>
        </div>
      </div>
    </div>
  )
}

Success.propTypes = {
  item: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired
}

export default Success
