import React, { useEffect } from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { Button, FormControl, FormLabel, Grid, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { modifyReceivingDetails } from '../../../actions/receiving';

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
      render={(props)=>(
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
          
          <Grid item xs={12} style={{paddingTop: `5px`}}>
								<TableDetail/>
          </Grid>
        </Grid>

      </Form>
      )}
    >
    </Formik>
  )
}
const useStyleDetail = makeStyles((theme)=>({
	container: {
		maxHeight: 300
	},
	titleDetail:{
		padding: `0px 20px`
	}
}))
const TableDetail = (props)=>{
  const classes = useStyleDetail();
  const dispatch = useDispatch();
  const receivingDetails = useSelector(state => state.receiving.receiving_details)
  const dataRow = receivingDetails

  const handleClick = (e, index)=>{
    dataRow.splice(index,1);
    dispatch(modifyReceivingDetails(dataRow))
  }
	const rowHead = [
		{label:"Sku"},
		{label:"Ten san pham"},
		{label:"Mau"},
		{label:"Size"},
		{label:"Gia nhap"},
    {label:"So luong đến"},
    {label:"So luong nhập"},
    {label:"Don gia"},
    {label:"..."}
	];
	return(
		<TableContainer component={Paper} className={classes.container}>
								<Grid item xs={12}>
						<Typography variant="h6" className={classes.titleDetail}> Chi tiet nhap hang </Typography>
					</Grid>
		<Table size="small" stickyHeader>
			<TableHead >
				<TableRow>
					{rowHead.map((row)=>(
						<TableCell align="left">
							{row.label}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
						{dataRow.map((row, index)=>(
							<TableRow>
							<TableCell align="left">
								{row.seller_sku}
							</TableCell>
							<TableCell>
								{row.name}
							</TableCell>
							<TableCell>
								{row.color}
							</TableCell>
							<TableCell>
								{row.size}
							</TableCell>
							<TableCell>
								{row.price}
							</TableCell>
							<TableCell>
								{row.quanity_received}
							</TableCell>
							<TableCell>
								{row.quantity_approved}
							</TableCell>
              <TableCell>
								{row.quantity_approved*row.price}
							</TableCell>
              <TableCell>
                <Button onClick={(e)=>handleClick(e,index)}>
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
