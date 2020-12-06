import React, { useEffect, useState } from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { Button, FormControl, FormLabel, Grid, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { modifyReceivingDetails } from '../../../actions/receiving';
import * as Yup from 'yup'
import { axiosHeroku } from '../../../ultils/api';
const formik={
  mapPropsToValues:{

  },
  validationSchema: Yup.object().shape({

  })
}

const ReceivingSlipForm = (props) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = (e)=>{
    console.log(e.target.value)
    setSearch(e.target.value);
  }
  useEffect(() => {
    axiosHeroku.get(`/products/get?search=${search}&limit=5&filter=all`)
    .then(res=>{
      console.log(res)
    })
  }, [search])

  return (
    <TextField
      onChange={handleSearch}
      label="Tên sản phẩm"
    />

  )
}


export default ReceivingSlipForm
