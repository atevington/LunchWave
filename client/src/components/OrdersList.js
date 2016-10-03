import React from 'react'

const OrdersList = ({orders}) => {
  return (
    <ul className="list-group">
      {orders.map((order, index) => (
        <li className="list-group-item" key={index}>
          <h4 className="list-group-item-header">{order.item}</h4>
          <p className="list-group-item-text">{order.notes}</p>
          {/*{JSON.stringify(order)}*/}
        </li>
      ))}
    </ul>
  )
}

OrdersList.propTypes = {
  orders: React.PropTypes.array.isRequired
}

export default OrdersList
