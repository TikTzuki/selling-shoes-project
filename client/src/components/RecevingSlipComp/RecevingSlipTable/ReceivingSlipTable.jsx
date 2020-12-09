import React, { useEffect } from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { Button, FormControl, FormLabel, Grid, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { modifyReceivingDetails } from '../../../actions/receiving';
import { axiosJsonServer } from '../../../ultils/api';

const useStyles = makeStyles((theme) => ({
  selectProvider: {
    minWidth: `10rem`
  },
  titleDetail: {
    padding: `20px 15px`
  }
}))

const ReceivingSlipTable = () => {
  const classes = useStyles();
  const receiving = useSelector(state => state.receiving)
  useEffect(() => {
    console.log(receiving)
  }, [receiving])
  return (
    <Formik
      initialValues={receiving}
      onSubmit={(values, action) => {
        if(receiving.receiving_details.length===0){
          console.log(receiving.receiving_details.length);
          return
        }
        let data = { ...receiving };
        delete data.receiving_details;
        axiosJsonServer.post('/receiving_slip', data)
          .then(res => {
            console.log(res);
            return res.data.id;
          })
          .then((id) => {
            console.log(id)
            let receivingItems = [...receiving.receiving_details];
            receivingItems.forEach((receiItem) => {
              receiItem.receiving_slipId = id
              axiosJsonServer.post('/receiving_details', receiItem)
                .then(res => {
                  console.log(res)
                })
            })

          }
          )
      }}
      render={(props) => (
        <Form >
          <Grid container>

            <Grid item md={3}>

              <Field
                name={`date_received`}
                render={({ field }) => (
                  <TextField
                    type="date"
                    label="Ngày nhập"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item md={3}>
              <Field
                name={'provider'}
                render={({ field }) => (
                  <FormControl className={classes.selectProvider}>
                    <InputLabel id="select-category">Nhà cung cấp</InputLabel>
                    <Select
                      native
                      {...field}
                    >
                      <option aria-label="None" value="" />
                      <option value={'CTY 1'}>CTY 1</option>
                      <option value={'CTY 2'}>CTY 2</option>
                      <option value={'CTY 3'}>CTY 3</option>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item md={3}>
              <Field
                name={'telephone'}
                render={({ field }) => (
                  <TextField
                    label="So dien thoai"
                    {...field} />
                )}
              />
            </Grid>

            <Grid item md={3}>
              <Field
                name={'address'}
                render={({ field }) => (
                  <TextField
                    label="Dia chi"
                    {...field} />
                )}
              />
            </Grid>

            <Grid item xs={12} style={{ paddingTop: `5px` }}>
              <TableDetail />
            </Grid>
            <Grid item xs={12}>
              <Button size="large" color="primary" type="submit">Tạo</Button>
            </Grid>
          </Grid>

        </Form>
      )}
    >
    </Formik>
  )
}
const useStyleDetail = makeStyles((theme) => ({
  container: {
    maxHeight: 300
  },
  titleDetail: {
    padding: `0px 20px`
  }
}))
const TableDetail = (props) => {
  const classes = useStyleDetail();
  const dispatch = useDispatch();
  const dataRow = useSelector(state => state.receiving.receiving_details)

  const handleClick = (e, index) => {
    dataRow.splice(index, 1);
    dispatch(modifyReceivingDetails(dataRow))
  }
  const setPrice = (e, index) => {
    dataRow[index].price = Number(e.target.value);
    console.log(dataRow[index])
    dispatch(modifyReceivingDetails(dataRow));
  }
  const setQtyReceived = (e, index) => {
    dataRow[index].quantity_received = Number(e.target.value);
    dispatch(modifyReceivingDetails(dataRow));
  }
  const setQtyApproved = (e, index) => {
    dataRow[index].quantity_approved = Number(e.target.value);
    dispatch(modifyReceivingDetails(dataRow));
  }
  const rowHead = [
    { label: "Sku" },
    { label: "Tên sản phẩm" },
    { label: "Màu" },
    { label: "Size" },
    { label: "Giá nhập" },
    { label: "Đến" },
    { label: "Nhập" },
    { label: "Đơn gia" },
    { label: "..." }
  ];
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table size="small" stickyHeader>
        <TableHead >
          <TableRow>
            {rowHead.map((row) => (
              <TableCell align="left">
                {row.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRow.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">
                <Typography variant="body2">{row.seller_sku}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.color}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.size}</Typography>
              </TableCell>
              <TableCell padding="none">
                <TextField defaultValue={row.price} onChange={(e) => setPrice(e, index)} />
              </TableCell>
              <TableCell padding="default">
                <TextField value={row.quantity_received} onChange={(e) => setQtyReceived(e, index)} />
              </TableCell >
              <TableCell padding="default">
                <TextField value={row.quantity_approved} onChange={(e) => setQtyApproved(e, index)} />
              </TableCell>
              <TableCell>
                {row.quantity_approved * row.price}
              </TableCell>
              <TableCell padding="none">
                <Button size="small" onClick={(e) => handleClick(e, index)}>
                  Xoa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ReceivingSlipTable
