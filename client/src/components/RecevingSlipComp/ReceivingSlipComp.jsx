import React, { useState } from 'react'
import ReceivingSlipForm from './ReceivingSlipForm/ReceivingSlipForm';
import ReceivingSlipTable from './RecevingSlipTable/ReceivingSlipTable';

const ReceivingSlipComp = () => {
  const [products, setProducts] = useState([])
  
  return (
    <div>
    <ReceivingSlipForm/>
    <ReceivingSlipTable/>
    </div>
  )
}

export default ReceivingSlipComp;
