import React, { useState } from 'react'
import ReceivingSlipForm from './ReceivingSlipForm/ReceivingSlipForm';
import TableProduct from './TableProduct/TableProduct'

const ReceivingSlipComp = () => {
  const [products, setProducts] = useState([])
  
  return (
    <div>
    <ReceivingSlipForm productsSelected={products}/>
    <TableProduct productsSelected={products}/>
    </div>
  )
}

export default ReceivingSlipComp;
