import React, { useState } from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { Button, Divider, FormControl, FormHelperText, Grid, Input, makeStyles, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Skus from './Skus/Skus';
import Sku from './Skus/Sku/Sku';
import * as Yup from 'yup';
import UploadFile from './UploadFile';
import ImageThumb from './UploadFile';
import { Autorenew, FullscreenExit } from '@material-ui/icons';
import objectToXml from '../../ultils/jsonToXml';
import { axiosSpring } from '../../ultils/api';

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
  },
  inputSize: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  inputColor: {
    maxWidth: 120,
    margin: `5px`
  },
  imagesContainer: {
    width: `100%`,
    height: theme.spacing(22),
    border: `1px solid ${theme.palette.secondary.light}`,
    display: `flex`,
    alignContents: `flex-start`
  },
  imagesContainerTitle: {
    height: theme.spacing(3),
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.light,
    paddingLeft: theme.spacing(4)
  },
  imageInput: {
    width: `100%`,
    height: `100%`,
    zIndex: 10,
    opacity: 0,
    cursor: `pointer`
  },
  imageInputWarp: {
    position: 'relative',
    border: `2px dashed ${theme.palette.secondary.light}`,
    width: theme.spacing(14),
    height: theme.spacing(14),
    cursor: `pointer`,
    margin: theme.spacing(1),
    zIndex: 0
  },
  imageThumb: {
    top: 0,
    left: 0,
    zIndex: 1,
    width: `100%`,
    height: `100%`,
    position: `absolute`,
    left: 0
  }
}))


const schema = Yup.object().shape({
  attributes: Yup.object({
    name: Yup.string().required(`Không được bỏ trống tên sản phẩm`),
    brand: Yup.string().required('Khong duoc de trong nhan hieu'),
    description: Yup.string().required('Khong duoc de trong mo ta')
  }),
  skus: Yup.array().of(Yup.object().shape({
    color_family: Yup.string().required('Khong duoc de trong mau')
  })),
  package_length: Yup.number('Phai là số').required('Khong duoc de trong chieu dai'),
  package_height: Yup.number('Phai là số').required('Khong duoc de trong chieu cao'),
  package_width: Yup.number('Phai là số').required('Khong duoc de trong chieu rong'),
  package_weight: Yup.number('Phải là số').required('Khong duoc de trong can nang')
})

const Product = (props) => {
  //const { product_id } = props;
  const classes = useStyles();
  const [colors, setColors] = useState([
    { color_family: 'vang', files: [""] },
    { color_family: 'xanh', files: [""] }
  ]);
  const [sizes, setSizes] = useState(['EU:39', 'EU:40']);
  const [files, setFiles] = useState({ xanh: [""] });

  const handleAddColor = (e) => {
    let flag = true;
    for (let color of colors) {
      if (color.color_family === '') {
        flag = false;
      }
    }
    if (flag) {
      setColors([...colors, { color_family: '', file: [""] }])
    }
  }
  const handleAddSize = (e) => {
    let flag = true;
    for (let el of sizes) {
      if (el === '') {
        flag = false;
      }
    }
    if (flag) {
      setSizes([...sizes, ''])
    }
  }
  const handleChangeSize = (event, index) => {
    let sizesTemp = sizes;
    sizesTemp[index] = event.target.value;
    if (!Boolean(sizesTemp[index])) {
      sizesTemp.splice(index, 1);
    }
    setSizes([...sizesTemp]);
  }
  const handleChangeColor = (event, index) => {
    let colorsTemp = colors;
    colorsTemp[index].color_family = event.target.value;
    if (!Boolean(colorsTemp[index].color_family)) {
      colorsTemp.splice(index, 1);
    }
    setColors([...colorsTemp]);

  }
  const getSkus = () => {
    let arr = []
    for (let size of sizes) {
      for (let color of colors) {
        arr.push({
          Images: [],
          SellerSku: "",
          color_family: color.color_family,
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
    skus: getSkus(),
    package_length: "",
    package_height: "",
    package_width: "",
    package_weight: ""
  };
  const handleChangeFile = (e, indexColor, indexFile) => {
    let colorsTemp = colors;
    colorsTemp[indexColor].files[indexFile] = e.target.files[0];
    if(colorsTemp[indexColor].files.length<6){
      colorsTemp[indexColor].files.push("");
    }
    console.log(colorsTemp);
    setColors([...colorsTemp]);
  }

  return (
    <Formik
      initialValues={initValues}
      initialTouched={initValues}
      validationSchema={schema}
      onSubmit={(values, action) => {

        const uploadImage = ()=>{
          colors.forEach((color, index)=>{
            let formData = new FormData();
            color.files.forEach((file)=>{
              if(file!==""){
                formData.append("file", file);
              }
            })
            
            axiosSpring.post('/products/images/upload', formData)
              .then((res)=>{console.log( res.data )})
          })
        }
        uploadImage()
        const setSkus = (colors, sizes)=>{
          let arr = [];
          for(let color of colors){
            for(let size of sizes){
              arr.push({})
            }
          }
          return {

          }
        }

        //alert(JSON.stringify(values,null, 2));
        //action.setSubmitting(false)
      }}
      render={({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container justify="flex-start">
            <Grid item xs={6}>
              <Field
                name='attributes.name'
                render={({ field }) => <>
                  <TextField
                    label="Tên sản phẩm"
                    className={classes.textFieldMd}
                    fullWidth
                    {...field} />
                  {errors.attributes && errors.attributes.name && touched.attributes.name ?
                    <FormHelperText>{errors.attributes.name}</FormHelperText> : ''}</>
                } />

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
                  <>
                    <TextField
                      label="Thương hiệu"
                      className={classes.textFieldMd}
                      fullWidth
                      {...field} />
                    {errors.attributes && errors.attributes.brand && touched.attributes.brand ?
                      <FormHelperText>{errors.attributes.brand}</FormHelperText> : ''}
                  </>
                }
              />
              { }
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

            <Grid item xs={12} style={{ marginTop: 20 }}>
              {colors.map((color, indexColor) => {
                return (
                  <Grid item xs={10} >
                    <TextField key={indexColor} value={color.color_family}
                      onChange={(e) => handleChangeColor(e, indexColor)}
                      className={classes.inputColor} />
                    <Grid container className={classes.imagesContainer} >
                      <Grid
                        className={classes.imagesContainerTitle}
                        fullWidth
                        item
                        xs={12}
                        variant="subtitle2">
                        Hình ảnh màu {color.color_family}
                      </Grid>
                      {color.files.map((file, indexFile) => (
                        <Grid item className={classes.imageInputWarp}>
                          <input
                            onChange={(e) => handleChangeFile(e, indexColor, indexFile)}
                            className={classes.imageInput}
                            type="file" />
                          {file && <><ImageThumb className={classes.imageThumb} image={file} />
                            <Typography variant="caption"  gutterBottom>{`.${file.type.slice(file.type.indexOf(`/`) + 1)}-${(file.size / 1000)}kB`}</Typography> </>}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )
              })}
              <Button variant="outlined" size="small" onClick={handleAddColor}>
                Thêm màu
              </Button>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 20 }}>
              {sizes.map((size, index) => {
                return <Select
                  labelId={`select-size-${index}`}
                  id={`select-size-${index}`}
                  value={size}
                  className={classes.inputSize}
                  onChange={(e) => handleChangeSize(e, index)}>
                  <MenuItem value={''}>Xóa</MenuItem>
                  <MenuItem value={'EU:37'}>37</MenuItem>
                  <MenuItem value={'EU:38'}>38</MenuItem>
                  <MenuItem value={'EU:39'}>39</MenuItem>
                  <MenuItem value={'EU:40'}>40</MenuItem>
                  <MenuItem value={'EU:41'}>41</MenuItem>
                  <MenuItem value={'EU:42'}>42</MenuItem>
                </Select>
              })}
              <Button variant="outlined" size="small" onClick={handleAddSize}>
                Thêm size
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Field
                name='package_length'
                render={({ field }) =>
                  <TextField
                    label="Chiều dài (cm)"
                    className={classes.textPackage}
                    {...field} />
                } />

              <Field
                name='package_height'
                render={({ field }) =>
                  <TextField
                    label="Chiều cao (cm)"
                    className={classes.textPackage}
                    {...field} />
                } />

              <Field
                name='package_width'
                render={({ field }) =>
                  <TextField
                    label="Chiều ngang (cm)"
                    className={classes.textPackage}
                    {...field} />
                } />

              <Field
                name='package_weight'
                render={({ field }) =>
                  <TextField
                    label="Cân nặng (kg)"
                    className={classes.textPackage}
                    {...field} />
                }
              />
              {touched.package_length && <FormHelperText>{errors.package_length}</FormHelperText>}
              {touched.package_height && <FormHelperText>{errors.package_height}</FormHelperText>}
              {touched.package_width && <FormHelperText>{errors.package_width}</FormHelperText>}
              {touched.package_weight && <FormHelperText>{errors.package_weight}</FormHelperText>}
            </Grid>

          </Grid>
          <Divider light variant="middle" />
          <Grid style={{ padding: 10 }} container justify="flex-end">
            <Grid item xs="8" />
            <Grid item xs="4">
              <Button variant="contained" color="primary" type="submit">
                Submit
                </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  )
}

export default Product
