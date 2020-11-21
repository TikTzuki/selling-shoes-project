import { Box, Collapse, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { axiosHeroku } from '../../../../ultils/api';

const ExpandRow = (props) => {
  const {open, order_id} = props;

  useEffect(() => {
    axiosHeroku.get('/laz-orders/get').then(res=>{

    })
  }, [])

  return (
    <TableRow>
    <TableCell style={{ padding: 0 }} colSpan={6}>
      <Collapse in={open}>
        <Box  margin={1}>
          <Typography>
            Table in table
                            </Typography>
          <Table size="small" aria-label="purchases">
            <TableBody>
              { order_id/*																		
                rows.map((row => (
                  <TableRow key={subContent.order_item_id} border={"none"}>
                    <TableCell component="th" scope="row" padding="none">
                      {subContent.name}
                    </TableCell>
                    <TableCell align="right">

                    </TableCell>
                    <TableCell align="right">
                      <img style={{width: 100, height: "auto"}} src={subContent.product_main_image} alt="order-itemss" />
                    </TableCell>
                  </TableRow>
                )))
                */}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
  )
}

export default ExpandRow
