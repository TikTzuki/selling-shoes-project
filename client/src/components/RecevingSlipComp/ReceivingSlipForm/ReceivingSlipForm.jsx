import React from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { FormControl, Grid, InputLabel, makeStyles, Select, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
selectProvider: {
  
}
}))
const ReceivingSlipForm = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        description: "",
        create_date: "",
        date_received: "",
        provider: "",
        telephone: "",
        address: "",
        status: "pending",
        receiving_details: [{
          shop_sku: "",
          seller_sku: "",
          name: "",
          color: "",
          size: "",
          quanity_received: 10,
          quantity_approved: 10,
          price: 20000
        }]
      }}
    >
      <Form >
      <Grid>
          <Field
            name={'provider'}
            render={({ field }) => (
              <FormControl fullWidth className={classes.selectProvider}>
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
        <Grid>
          <Field
            name={`date_received`}
            render={({ field }) => (
              <TextField type="date"
                {...field} />
            )}
          />
        </Grid>
        <Grid>
          <Field
            name={'telephone'}
            render={({ field }) => (
              <TextField

                {...field} />
            )}
          />
        </Grid>
        <Grid>
          <Field
            name={'address'}
            render={({ field }) => (
              <TextField

                {...field} />
            )}
          />
        </Grid>
      </Form>
    </Formik>
  )
}

export default ReceivingSlipForm
