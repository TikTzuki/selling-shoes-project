import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react'
import SearchProduct from '../ProductComp/SearchProduct';
import ReceivingSlipForm from './ReceivingSlipForm/ReceivingSlipForm';
import ReceivingSlipTable from './RecevingSlipTable/ReceivingSlipTable';
const useStyles = makeStyles((theme) => ({
  productAvailable: {
    border: `1px solid ${theme.palette.divider}`
  }
}))
const ReceivingSlipComp = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([])

  return (
    <Grid container>
      <Grid container className={classes.productAvailable} component={Paper}>
        <Grid item md={2} style={{ height: `330px` }}>
          <SearchProduct/>
        </Grid>
        <Grid item md={10}>
          <ReceivingSlipForm height={330} />
        </Grid>
      </Grid>
      <ReceivingSlipTable/>
    </Grid>
  )
}

export default ReceivingSlipComp;
