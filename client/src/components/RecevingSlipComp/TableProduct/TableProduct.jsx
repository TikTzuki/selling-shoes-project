import React, { useState } from 'react'
import SearchProduct from './SearchProduct'

const TableProduct = () => {
  const [search, setSearch] = useState({
    name: ``,
    sellerSku: ``,
    shopSku: `3001`,
    statement: ``
})

  return (
    <div>
      <SearchProduct search={search} />
    </div>
  )
}

export default TableProduct
