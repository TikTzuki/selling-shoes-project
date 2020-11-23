import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react'
import { axiosJsonServer } from '../../ultils/api';

const useRowStyles = makeStyles((theme)=>(
  {
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    }
  }
))
function Row2(props) {
  const { row } = props;
  //const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment key={1}>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell> id </TableCell>
            <TableCell align="right"> {row.id} </TableCell>
            <TableCell align="right"> {row.bill_id}</TableCell>
            <TableCell align="right"> {row.seller_sku} </TableCell>
            <TableCell align="right"> {row.number}</TableCell>
            <TableCell align="right"> {row.price} </TableCell>
            <TableCell align="right"> {row.paid_price} </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const LocalBillDetailsPage = (props) => {
  const [rows, setRows] = useState([]);
  const fetchData = async ()=>{
    await axiosJsonServer.get('/bill_item')
      .then((response)=>{
        let bill_item = response.data;
        setRows(bill_item)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" multiSelectable={true}>

        <TableHead checkboxSelection>
          <TableRow checkboxSelection>
            <TableCell />
            <TableCell> id </TableCell>
            <TableCell align="right"> bill id</TableCell>
            <TableCell align="right"> shop_sku </TableCell>
            <TableCell align="right"> seller_sku </TableCell>
            <TableCell align="right"> number</TableCell>
            <TableCell align="right"> price </TableCell>
            <TableCell align="right"> paid_price </TableCell>
          </TableRow>
        </TableHead>

        <TableBody checkboxSelection>
          {rows.map((row) => (
            <Row2 key={row.id} row={row} />
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
  )
}

export default LocalBillDetailsPage
