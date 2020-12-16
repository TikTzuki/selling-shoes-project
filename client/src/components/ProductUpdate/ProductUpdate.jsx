import React, { useEffect, useState } from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { Button, Divider, FormControl, FormHelperText, Grid, Input, InputLabel, List, makeStyles, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Skus from './Skus/Skus';
import Sku from './Skus/Sku/Sku';
import * as Yup from 'yup';
import UploadFile from './UploadFile';
import ImageThumb from './UploadFile';
import { Autorenew, FullscreenExit, Image } from '@material-ui/icons';
import objectToXml from '../../ultils/jsonToXml';
import { axiosHeroku, axiosJsonServer, axiosSpring } from '../../ultils/api';
import { isObject } from '../../ultils/check';
import FormProduct from './FormProduct';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: theme.spacing(120),
    paddingLeft: theme.spacing(10),
    paddingBottom: theme.spacing(10)
  },
  selectCategory: {
    marginTop: theme.spacing(4)
  },
  textFieldMd: {
    marginTop: theme.spacing(4)
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
    zIndex: -1,
    width: `100%`,
    height: `100%`,
    position: `absolute`,
    left: 0
  },
  skuContainer: {
    border: `1px solid ${theme.palette.action.active}`,
    borderRadius: theme.spacing(1),
  },
  skuTitle: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4)
  },
  sku: {
    display: `flex`,
    paddingTop: 20,
    paddingBottom: 20,
    border: `0.5 solid ${theme.palette.secondary.light}`
  }
}))

const ProductUpdate1 = (props) => {
  const { errors, touched, handleSubmit, values, setSubmitting } = props;
  const classes = useStyles();
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [skus, setSkus] = useState([
    //{ color_family: 'af', size: '', price: "", quantity: "", images: [""] }
  ]);

  //init Colors
  skus.filter((sku) => {
    let flag = true;

    colors.forEach((color) => {
      if (sku.color_family === color.color_family)
        flag = false
    })

    if (flag) {
      setColors([...colors, { color_family: sku.color_family, images: [...sku.images] }]);
      return { color_family: sku.color_family, images: [...sku.images] }
    }
  })
  //init size
  skus.filter((sku) => {
    let flag = true;

    sizes.forEach((size) => {
      if (sku.size === size)
        flag = false
    })

    if (flag) {
      setSizes([...sizes, sku.size]);
      return sku.size
    }
  })

  const handleAddColor = (e) => {
    let flag = true;
    for (let color of colors) {
      if (color.color_family === '') {
        flag = false;
      }
    }
    if (flag) {
      setColors([...colors, { color_family: '', images: [""] }])
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
    console.log(event.target.value, colorsTemp)
  }

  const handleChangePrice = (e, color, size) => {
    let skusTemp = skus;
    skusTemp.forEach((sku, index) => {
      if (sku.color_family == color.color_family && sku.size == size) {
        sku.price = e.target.value;
      }
    })
    setSkus([...skusTemp])
    console.log(skus);
  }

  const handleChangeQuantity = (e, color, size) => {
    let skusTemp = skus;
    skusTemp.forEach((sku, index) => {
      if (sku.color_family == color.color_family && sku.size == size) {
        sku.quantity = e.target.value;
      }
    })
    setSkus([...skusTemp])
    console.log(skus);
  }

  const handleChangeFile = (e, indexColor, indexFile) => {
    let colorsTemp = colors;
    colorsTemp[indexColor].images[indexFile] = e.target.files[0];
    if ((indexFile === colorsTemp[indexColor].images.length - 1) && (colorsTemp[indexColor].images.length < 6)) {
      colorsTemp[indexColor].images.push("");
    }
    console.log(colorsTemp);
    setColors([...colorsTemp]);
  }
  return (
    <Form
      onSubmit={async (values, action) => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        await sleep(5000);
        alert(JSON.stringify(values, null, 2));
        const uploadImages = () => {
          //pending
          let skusTemp = [];
          console.log('pending');

          colors.forEach((color, indexColor) => {
            console.log(color);
            //init FormData
            let formData = new FormData();
            color.Images.forEach((file) => {
              if (file !== "") {
                formData.append("file", file, file.name + Date.now());
              }
            })
            //upload image
            axiosSpring.post('/products/images/upload', formData)
              .then((res) => {
                console.log(res.data);
                let imageUrls = [];

                res.data.images.forEach((image) => {
                  imageUrls.push(image.data.image.url);
                })

                sizes.forEach((size, indexSize) => {
                  skusTemp.push({
                    color_family: color.color_family,
                    size: size,
                    Images: imageUrls,
                    quantity: findGetSku(skus, color.color_family, size).quantity,
                    price: findGetSku(skus, color.color_family, size).price,
                    package_length: values.package_length,
                    package_height: values.package_height,
                    package_width: values.package_width,
                    package_weight: values.package_weight
                  });
                })
                console.log('success')
              })
              .then(() => {
                if (indexColor === colors.length - 1) {
                  let product = { attributes: values.attributes, primary_category: values.primary_category, skus: skusTemp };
                  uploadProduct(product)
                }
              })
          })
        }

        const uploadProduct = (product) => {
          axiosSpring.post('/products/create', createPayloadv2(product))
            .then((res) => {
              console.log(res);
              if (res.data.code == 0) {
                alert("Create success");
              } else {
                alert("Create failed");
              }
            })
          console.log(createPayloadv2(product));
        }

        const createPayloadFromSkus = (skus) => {
          let payload = "";
          console.log('skus', skus);
          skus.forEach((sku) => {
            payload += `<sku>
              <SellerSku>${sku.size + sku.color_family + Date.now()}</SellerSku>
              <color_family> ${sku.color_family} </color_family>
              <size> ${sku.size} </size>
              <price> ${sku.price} </price>   
              <quantity> ${sku.quantity} </quantity>
              <package_length> ${sku.package_length} </package_length>                 
              <package_height> ${sku.package_height} </package_height>                 
              <package_weight>${sku.package_weight}</package_weight>                 
              <package_width>${sku.package_width}</package_width>
              <Images>                     
              ${sku.Images.map(image => (
              `<image> ${image} </image>`
            ))}      
              </Images>
              </sku>`
          })
          return payload;
        }

        const createPayloadv2 = (product) => {
          return `<?xml version="1.0" encoding="UTF-8"?>
            <Request>
             <Product>
              <PrimaryCategory> ${product.primary_category}</PrimaryCategory>
              <SPUId></SPUId>
              <AssociatedSku></AssociatedSku>           
              <Attributes>
               <name> ${product.attributes.name} </name>
               <short_description> ${product.attributes.description} </short_description>
               <brand> ${product.attributes.brand} </brand>
              </Attributes>
              <Skus>${createPayloadFromSkus(product.skus)}
              </Skus>
             </Product>
            </Request>`
        }

        const findGetSku = (skus, color_family, size) => {
          let skusTemp = [...skus];
          let result = {};
          skusTemp.forEach((sku, index) => {
            if (sku.color_family == color_family && sku.size == size) {
              result = sku;
            }
          })
          return result;
        }
        //uploadImages()

        //action.setSubmitting(false)
      }}>
      <Grid container className={classes.formContainer} justify="flex-start">
        <Grid item xs={2} />
        {/* attribute */}
        <Grid item xs={6}>
          <Field
            name='attributes.name'
            render={({ field }) => <>
              <TextField
                label="Tên sản phẩm"
                className={classes.textFieldMd}
                fullWidth
                {...field} />
              {errors.attributes && touched.attributes && errors.attributes.name && touched.attributes.name ?
                <FormHelperText>{errors.attributes.name}</FormHelperText> : ''}</>
            } />

          <Field
            name='primary_category'
            render={({ field }) =>
              <FormControl fullWidth className={classes.selectCategory}>
                <InputLabel id="select-category">Ngành hàng</InputLabel>
                <ListCategory
                  label="Danh mục ngành hàng"
                  labelId={`select-category`}
                  field={field} />
              </FormControl>
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
        </Grid>
        {/* Description */}
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
        {/* Color */}
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
                  {color.Images.map((file, indexFile) => (
                    <Grid item className={classes.imageInputWarp}>
                      <input
                        onChange={(e) => handleChangeFile(e, indexColor, indexFile)}
                        className={classes.imageInput}
                        type="file" />
                      {file && <><ImageThumb className={classes.imageThumb} image={file} />
                        <Typography variant="caption" gutterBottom>{`.${file.type.slice(file.type.indexOf(`/`) + 1)}-${(file.size / 1000)}kB`}</Typography>
                      </>}
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
        {/* Size*/}
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
        {/* Sku */}
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <div className={classes.skuContainer}>
            <Typography fullWidth variant="body1" className={classes.skuTitle}> Giá và hàng tồn </Typography>
            {
              sizes.map((size, indexSize) => (
                <div >
                  {colors.map((color, indexColor) => {
                    return (
                      <>
                        <Divider />
                        <Grid container justify="space-around" className={classes.sku}>
                          <Grid item xs={3}>
                            <Typography> {color.color_family}-{size} </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <TextField id={`price-${indexSize * indexColor}`}
                              label={`giá`}
                              variant="outlined"
                              size="small"
                              onChange={(e) => handleChangePrice(e, color, size)} />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField id={`quantity-${indexSize * indexColor}`}
                              label={`số lượng`}
                              variant="outlined"
                              size="small"
                              onChange={(e) => handleChangeQuantity(e, color, size)} />
                          </Grid>
                        </Grid></>
                    )
                  })}
                </div>
              ))
            }
          </div>
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
  )
}

const ListCategory = (props) => {
  console.log(props);
  const { field, className } = props;
  const [categories, setCategories] = useState([]);



  const getCategorys = async () => {
    let cates = []
    await axiosJsonServer.get('/category')
      .then(res => {
        cates = res.data
        setCategories(res.data)
      })
    return cates;
  }
  useEffect(() => {
    getCategorys();
  }, [])


  return (<Select
    {...field}
    native
    label="Danh mục ngành hàng"
    labelId={`select-category`}
    className={className}>
    <option value={""}>  </option>
    {categories.map((cate) => (
      <option value={cate.primary_category}> {cate.name} </option>
    ))}
  </Select>)
}

const ProductUpdate = (props) => {
  const classes = useStyles();
  const { productId } = props
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [skus, setSkus] = useState([]);
  const initValue = {
    attributes: {
      name: "",
      brand: "No Brand",
      description: "",
    },
    primary_category: "",
    //skus: getSkus(),
    package_length: "",
    package_height: "",
    package_width: "",
    package_weight: ""
  }

        //init Colors
        console.log(skus);
        skus.filter((sku) => {
          let flag = true;

          colors.forEach((color) => {
            if (sku.color_family === color.color_family)
              flag = false
          })

          if (flag) {
            setColors([...colors, { color_family: sku.color_family, Images: sku.Images }]);
            return { color_family: sku.color_family, Images: [...sku.Images] }
          }
        })
        //init size
        skus.filter((sku) => {
          let flag = true;

          sizes.forEach((size) => {
            if (sku.size === size)
              flag = false
          })

          if (flag) {
            setSizes([...sizes, sku.size]);
            return sku.size
          }
        })

  return <div>
    <Formik
      initialValues={initValue}
      onSubmit={(values, action) => {

        const uploadImages = () => {
          console.log(skus);
          action.setSubmitting(false);
          //pending
          let skusTemp = [];
          console.log('pending');

          colors.forEach((color, indexColor) => {
            console.log(color);
            //init FormData
            let formData = new FormData();
            color.Images.forEach((file) => {
              if (file !== "") {
                formData.append("file", file, file.name + Date.now());
              }
            })
            //upload image
            axiosSpring.post('/products/images/upload', formData)
              .then((res) => {
                console.log(res.data);
                let imageUrls = [];

                res.data.images.forEach((image) => {
                  imageUrls.push(image.data.image.url);
                })

                sizes.forEach((size, indexSize) => {
                  skusTemp.push({
                    color_family: color.color_family,
                    size: size,
                    Images: imageUrls,
                    quantity: findGetSku(skus, color.color_family, size).quantity,
                    price: findGetSku(skus, color.color_family, size).price,
                    package_length: values.package_length,
                    package_height: values.package_height,
                    package_width: values.package_width,
                    package_weight: values.package_weight
                  });
                })
                console.log('success')
              })
              .then(() => {
                if (indexColor === colors.length - 1) {
                  let product = { attributes: values.attributes, primary_category: values.primary_category, skus: skusTemp };
                  uploadProduct(product)
                }
              })
          })
        }

        const uploadProduct = (product) => {
          axiosSpring.post('/products/create', createPayloadv2(product))
            .then((res) => {
              console.log(res);
              if (res.data.code == 0) {
                alert("Create success");
              } else {
                alert("Create failed");
              }
            })
          console.log(createPayloadv2(product));
        }

        const createPayloadFromSkus = (skus) => {
          let payload = "";
          console.log('skus', skus);
          skus.forEach((sku) => {
            payload += `<sku>
            <SellerSku>${sku.size + sku.color_family + Date.now()}</SellerSku>
            <color_family> ${sku.color_family} </color_family>
            <size> ${sku.size} </size>
            <price> ${sku.price} </price>   
            <quantity> ${sku.quantity} </quantity>
            <package_length> ${sku.package_length} </package_length>                 
            <package_height> ${sku.package_height} </package_height>                 
            <package_weight>${sku.package_weight}</package_weight>                 
            <package_width>${sku.package_width}</package_width>
            <Images>                     
            ${sku.Images.map(image => (
              `<image> ${image} </image>`
            ))}      
            </Images>
            </sku>`
          })
          return payload;
        }

        const createPayloadv2 = (product) => {
          return `<?xml version="1.0" encoding="UTF-8"?>
          <Request>
           <Product>
            <PrimaryCategory> ${product.primary_category}</PrimaryCategory>
            <SPUId></SPUId>
            <AssociatedSku></AssociatedSku>           
            <Attributes>
             <name> ${product.attributes.name} </name>
             <short_description> ${product.attributes.description} </short_description>
             <brand> ${product.attributes.brand} </brand>
            </Attributes>
            <Skus>${createPayloadFromSkus(product.skus)}
            </Skus>
           </Product>
          </Request>`
        }

        const findGetSku = (skus, color_family, size) => {
          let skusTemp = [...skus];
          let result = {};
          skusTemp.forEach((sku, index) => {
            if (sku.color_family == color_family && sku.size == size) {
              result = sku;
            }
          })
          return result;
        }
        //uploadImages()

        //action.setSubmitting(false)
        uploadImages()
      }}
    >
      {props => (<FormProduct {...props}
        productId={productId}
        colors={colors} setColors={(colors)=>setColors(colors)}
        sizes={sizes} setSizes={setSizes}
        skus={skus} setSkus={(skus)=>setSkus(skus)} />)}
    </Formik>
  </div>
};
export default ProductUpdate
