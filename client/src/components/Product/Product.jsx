import React, { useState } from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { Button, Grid, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Skus from './Skus/Skus';
import Sku from './Skus/Sku/Sku';

const useStyles = makeStyles((theme) => ({
  textFieldMd: {
    marginTop: theme.spacing(3)
  },
  textAreaLabel: {
    marginTop: theme.spacing(4)
  },
  textArea: {
    width: '100%',
    backgroundColor: theme.palette.background,
    color: theme.palette.text
  },
  textPackage: {
    marginRight: theme.spacing(2)
  }
}))

const Product = (props) => {
  const { product_id } = props;
  const classes = useStyles();
  const [colors, setColors] = useState(['vang', 'xanh']);
  const [sizes, setSizes] = useState(['EU:39', 'EU:40']);

  const temp = ({
    Images: [],
    SellerSku: "",
    color_family: "",
    quantity: "",
    size: "",
    price: 0,
    package_length: "",
    package_height: "",
    package_width: "",
    package_weight: ""
  });
  const tempp = () => {
    let arr = []
    for (let size of sizes) {
      
      for (let color of colors) {
        arr.push({
          Images: [],
          SellerSku: "",
          color_family: color,
          quantity: "",
          size: size,
          price: 0,
          package_length: "",
          package_height: "",
          package_width: "",
          package_weight: ""
        })
      }
    }
    return arr;
  }
  const initValues = {
    attributes: {
      name: "",
      brand: "No Brand",
      description: "",
    },
    primary_category: "",
    skus: [
      tempp()
    ],
    package_length: "",
    package_height: "",
    package_width: "",
    package_weight: ""
  };
  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values, action) => {
        console.log(values)
        action.setSubmitting(false)
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Grid container justify="flex-start">
            <Grid item xs={6}>
              <Field
                name='attributes.name'
                render={({ field }) =>
                  <TextField
                    label="Tên sản phẩm"
                    className={classes.textFieldMd}
                    fullWidth
                    {...field} />
                }
              />
              <Field
                name='primary_category'
                render={({ field }) =>
                  <TextField
                    label="Danh mục ngành hàng"
                    className={classes.textFieldMd}
                    fullWidth
                    {...field} />
                }
              />
              <Field
                name='attributes.brand'
                render={({ field }) =>
                  <TextField
                    label="Thương hiệu"
                    className={classes.textFieldMd}
                    fullWidth
                    {...field} />
                }
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6" color="textSecondary" className={classes.textAreaLabel}>
                Mô tả:
                </Typography>
              <Field
                name='attributes.description'
                render={({ field }) =>
                  <TextareaAutosize
                    label="Mô tả"
                    rowsMin={10}
                    className={classes.textArea}
                    {...field} />
                }
              />
            </Grid>
            <Grid item xs={12}>
              {sizes.map((size, index) => {
                return colors.map((color, index) => {
                  return <Sku sku={{ size: size, color: color }} />
                })
              })}

            </Grid>
            <Grid item xs={12}>
              <Field
                name='package_length'
                render={({ field }) =>
                  <TextField
                    label="Chiều dài (cm)"
                    className={classes.textPackage}
                    {...field} />
                }
              />
              <Field
                name='package_height'
                render={({ field }) =>
                  <TextField
                    label="Chiều cao (cm)"
                    className={classes.textPackage}
                    {...field} />
                }
              />
              <Field
                name='package_width'
                render={({ field }) =>
                  <TextField
                    label="Chiều ngang (cm)"
                    className={classes.textPackage}
                    {...field} />
                }
              />
              <Field
                name='package_weight'
                render={({ field }) =>
                  <TextField
                    label="Cân nặng (kg)"
                    className={classes.textPackage}
                    {...field} />
                }
              />
            </Grid>
            <Grid item>
              <Button type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default Product
