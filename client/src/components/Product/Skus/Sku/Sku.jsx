import React from 'react'

const Sku = (props) => {
  const {sku} = props;
  return (
    <div>
      {sku.size} {sku.color}
    </div>
  )
}

export default Sku
