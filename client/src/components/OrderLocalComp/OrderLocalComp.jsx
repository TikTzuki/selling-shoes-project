import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { axiosJsonServer } from '../../ultils/api';
import { Link } from 'react-router-dom';

//Custom css
const useRowStyles = makeStyles((theme)=>(
  {
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    }
  }
))

// Component
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment key={1}>
      <TableRow className={classes.root}>
        {/*<TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>*/}
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.customer_id}</TableCell>
        <TableCell align="right">{row.create_date}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">
          <Button component={Link} to={`/order-local/detail/${row.id}`}> Sửa </Button>
          <Button> Xóa </Button>
          <Button> Chuyển trạng thái </Button>
        </TableCell>
      </TableRow>
      {/*<TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}
/*
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}
//
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
*/
const OrderLocalComp = () => {
  const [rows, setRows] = useState([]);

  const fetchData = async ()=>{
    await axiosJsonServer.get('/bill')
      .then((response)=>{
        let bills = response.data;
        setRows(bills)
      })
  }

  //Component mounted
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" multiSelectable={true}>

        <TableHead checkboxSelection>
          <TableRow checkboxSelection>
            <TableCell />
            <TableCell> Khách hàng </TableCell>
            <TableCell align="right"> Ngày tạo</TableCell>
            <TableCell align="right"> # </TableCell>
            <TableCell align="right"> Trạng thái </TableCell>
          </TableRow>
        </TableHead>

        <TableBody checkboxSelection>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
  )
}

export default OrderLocalComp
