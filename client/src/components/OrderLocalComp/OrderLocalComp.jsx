import { Button, Paper, Grid,Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { axiosJsonServer } from '../../ultils/api';
import { Link } from 'react-router-dom';
import SearchProduct from '../ProductComp/SearchProduct';
import OrderLocalForm from './OrderLocalForm/OrderLocalForm';
import OrderLocalTable from './OrderLocalTable/OrderLocalTable';

//Custom css
const useStyles = makeStyles((theme) => ({
  productAvailable: {
    border: `1px solid ${theme.palette.divider}`
  }
}))

const OrderLocalComp = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([])

  return (
    <Grid container>
      <Grid container className={classes.productAvailable} component={Paper}>
        <Grid item md={2} style={{ height: `330px` }}>
          <SearchProduct/>
        </Grid>
        <Grid item md={10}>
          <OrderLocalForm height={330} />
        </Grid>
      </Grid>
      <OrderLocalTable/>
    </Grid>
  )
}

export default OrderLocalComp
