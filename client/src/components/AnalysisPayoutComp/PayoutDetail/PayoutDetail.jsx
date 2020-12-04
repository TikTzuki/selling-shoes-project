import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react'

const useStyles = makeStyles((theme)=>({
  flexRow: {
    display: `flex`,
    justifyContent: `space-between`,
    padding: theme.spacing(2)
  }
}));

const PayoutDetail = (props) => {
  const { payout } = props;
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item className={classes.flexRow} xs={12}>
        <Typography>
          Mã chu kỳ
      </Typography>
        <Typography>
          {payout.statement_number}
        </Typography>
      </Grid>
      <Grid item className={classes.flexRow} xs={12}>
        <Typography>
          {payout.created_at.slice(0 ,payout.created_at.indexOf(" "))} - {payout.updated_at.slice(0 ,payout.updated_at.indexOf(" "))}
      </Typography>
        <Typography>
          {payout.closing_balance}
        </Typography>
      </Grid>

      <Grid item className={classes.flexRow} xs={12}>
        <Typography>
          Giá trị hàng
      </Typography>
        <Typography>
          {payout.item_revenue}
        </Typography>
      </Grid>

      <Grid item className={classes.flexRow} xs={12}>
        <Typography>
          Phí thanh toán
      </Typography>
        <Typography>
          {payout.fees_total}
        </Typography>
      </Grid>

      <Grid item  className={classes.flexRow} xs={12}>
        <Typography>
          Phí vận chuyển trả bởi khách hàng
      </Typography>
        <Typography>
          {payout.shipment_fee_credit}
        </Typography>
      </Grid>

      <Grid item className={classes.flexRow} xs={12}>
        <Typography>
          Phí vận chuyển nhà bán hàng trả
      </Typography>
        <Typography>
          {payout.shipment_fee}
        </Typography>
      </Grid>

      <Divider variant="middle" style={{width: `100%`}} />

      <Grid item className={classes.flexRow} xs={12}>
        <Typography variant="h4">
          Số dư cuối
      </Typography>
        <Typography variant="h4">
          {payout.closing_balance}
        </Typography>
      </Grid>

    </Grid>
  )
}
/* closing_balance: "1521950.71"
created_at: "2020-11-30 00:30:15"
fees_on_refunds_total: "0"
fees_total: "-677307.59"
guarantee_deposit: "0"
item_revenue: "1673776.00"
opening_balance: "0.00"
other_revenue_total: "364564.00"
paid: "1"
payout: "1521950.71 VND"
refunds: "0"
shipment_fee: "-636500.00"
shipment_fee_credit: "364564.00"
statement_number: "VNJ2NI08-2020-048"
subtotal1: "2715647.59"
subtotal2: "2715647.59"
updated_at: "2020-12-03 21:39:05" */
export default PayoutDetail
