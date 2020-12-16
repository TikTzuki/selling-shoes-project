import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, withFormik } from 'formik'
import ImageThumb from '../../components/ProductCreate/UploadFile';
import { Button, Grid, TextField } from '@material-ui/core';
import { axiosJsonServer } from '../../ultils/api';
import { PortraitSharp } from '@material-ui/icons';

const formik = {
  mapPropsToValues: () => ({
    name: "",
    phone_number: "",
    address: "",
    email: ""
  }),
  handleSubmit: (values, action)=>{
    console.log(values);
    if(values.hasOwnProperty('id')){
      axiosJsonServer.put(`/customer/${values.id}`, values)
      .then(res => {
        console.log(res);
        window.alert("Sua thanh cong");
      })
    }
    if(!values.hasOwnProperty('id')){
      axiosJsonServer.post('/customer', values)
      .then(res => {
        console.log(res)
        window.alert("Them thanh cong")
      })
    }
  }
}

const CustomerModifyPage = (props) => {
  const customerId = props.match && props.match.params.customer_id ? props.match.params.customer_id : false;
  const isNewpublishPage = !Boolean(customerId);
  console.log(isNewpublishPage)
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    if(!isNewpublishPage){
      axiosJsonServer.get(`/customer/${customerId}`)
      .then(res => {
        const customer = res.data
        let fields = [`id`,`name`, `phone_number`, `address`, `email`];
        
        fields.forEach((field) => {
          props.setFieldValue(field, customer[field], false)
          console.log(customer[field]);
        })
        
        setCustomer(customer);
      })
    }
  }, [])

  return (
     <Form >
          <Grid container>
            <Grid item>
              <Field
                name={`name`}
                render={({ field }) => (
                  <TextField
                    label={`Tên khách hàng`}
                    {...field} />
                )} />
            </Grid >
            <Grid item>
              <Field
                name={`phone_number`}
                render={({ field }) => (
                  <TextField
                    label={`So dien thoai`}
                    {...field} />
                )} />
            </Grid>
            <Grid item>
              <Field
                name={`address`}
                render={({ field }) => (
                  <TextField
                    label={`Dia chi`}
                    {...field} />
                )} />
            </Grid>
            <Grid item>
              <Field
                name={`email`}
                render={({ field }) => (
                  <TextField
                    label={`Email`}
                    {...field} />
                )} />
            </Grid>
          </Grid>
      {isNewpublishPage ? (
        <Button type="submit">
          Thêm
        </Button>
      ) : (
          <Button type="submit">
            Sửa
          </Button>
        )}

        </Form>
  )
}

export default withFormik(formik)(CustomerModifyPage)
