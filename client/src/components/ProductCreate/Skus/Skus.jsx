import { makeStyles, TextField, Typography } from '@material-ui/core'
import { mergeClasses } from '@material-ui/styles';
import { Field, FieldArray } from 'formik'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme)=>({

}))

const Skus = (props) => {
  const { values } = props;
  const classes = useStyles();
  const [colors, setColors] = useState(["vàng", "xanh"]);
  const [sizes, setSizes] = useState(["EU:39","EU:40"]);
  
  useEffect(() => {
    {colors.map((color,colorIndex) => (
      sizes.map((size, sizeIndex)=>{
        values.skus.push({
          Images: [],
          SellerSku: "",
          color_family: color,
          quantity: "",
          size: size,
          price: 0,
          package_length: "",
          package_height: "",
          package_width: "",
          package_weight: ""});
        console.log(values);
        })  
    ))}
    return () => {
      
    }
  }, [])

  return (
  <>
      <Typography variant="h6"> Nhóm màu </Typography>
          <div>
          {colors.map((color,colorIndex) => (
            sizes.map((size, sizeIndex)=>{
              return <Field
                name={`skus[${colorIndex*sizeIndex}].size`}
                render={({field})=>
                  <TextField
                    label={'Size'}
                  {...field}/>
                }
              />
              })
          ))}
          </div>
    </>
    )
}

export default Skus;
 /*values.skus && values.skus.length>0 ? (
            values.skus.map((sku, index)=>(
              <div key={index}>
                <Field
                  name={`skus[${index}].color_family`}
                  render={({field})=>
                    <TextField
                      label="Màu"
                      className={classes.textFieldColor}
                      {...field}
                    />}
                />
              </div>
            ))
          ):(

          )*/