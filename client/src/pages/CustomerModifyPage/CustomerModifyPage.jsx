import React from 'react'

const CustomerModifyPage = (props) => {
  const customerId = props.match.params.customer_id;
  console.log(props);
  return (
    <div>
      Modify customer {customerId}
    </div>
  )
}

export default CustomerModifyPage
