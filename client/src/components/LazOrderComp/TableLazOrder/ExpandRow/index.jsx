import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { axiosHeroku } from '../../../../ultils/api';

const headCell = [
  { id: 'order_id', numeric: false, disablePadding: true, label: 'Sản phẩm' },
  { id: 'order_id', numeric: false, disablePadding: true, label: 'Hình' },
  { id: 'order_id', numeric: false, disablePadding: true, label: 'Sku' },
  { id: 'order_id', numeric: false, disablePadding: true, label: 'Giá gốc' },
  { id: 'order_id', numeric: false, disablePadding: true, label: 'Giá bán' },
  { id: 'order_id', numeric: false, disablePadding: true, label: 'Tiền ship' }
]

const ExpandRow = (props) => {
  const {open, order_id} = props;
  const [rows, setRows] = useState([]);

  const fecthOrderItem =async ()=>{
    await axiosHeroku.get(`/laz-orders/order/items/get?order_id=${order_id}`).then(res=>{
      console.log("laz order items",res.data.data);
      setRows(res.data.data);
  })
  }

  useEffect(() => {

    fecthOrderItem();

  }, [])

  return (
    <TableRow>
    <TableCell style={{ padding: 0 }} colSpan={10}>
      <Collapse in={open}>
        <Box  margin={1}>
          <Typography>
            Chi tiết đơn hàng
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                {headCell.map((cell)=>(
                  <TableCell key={cell.id} align="left"> {cell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {																	
                rows.map((row => (
                  <TableRow key={row.order_item_id} border={"none"}>
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <img style={{width: 100, height: "auto"}} src={row.product_main_image} alt="order-items" />
                    </TableCell>
                    <TableCell align="right">
                      {row.sku}
                      </TableCell>
                      <TableCell align="right">
                        {row.item_price}
                      </TableCell>
                    <TableCell align="right">
                      {row.paid_price}
                      </TableCell>
                      <TableCell align="right">
                      {row.shipping_amount}
                      </TableCell>
                  </TableRow>
                )))
              }
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
  )
}

export default ExpandRow
