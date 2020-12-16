import React, { useEffect, useState } from 'react'
import { Field, Form, Formik, withFormik } from 'formik';
import { Button, ButtonGroup, Input, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addReceivingDetail, modifyReceivingDetails } from '../../../actions/receiving';
import * as Yup from 'yup'
import { axiosHeroku } from '../../../ultils/api';
const dataHead = [
  {label: "Tên"},
  {label: "Hình"},
  {label: "Sku"},
  {label: "Màu-Size"},
  {label: "#"},
  {label: "Giá"},
  {label: "..."},
]
const useStyles = makeStyles((theme)=>({
  inputQuantity: {
    textAlign: `center`,

  }
}))
const OrderLocalForm = (props) => {
  const [products, setProducts] = useState([]);
  const {height} = props;
  const classes = useStyles();
  const searchProduct = useSelector(state => state.searchProduct);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  const handleChangeQuantity = (e,index)=>{
    let rowsTemp = rows;
    rowsTemp[index].value = e.target.value ? e.target.value : 1 ;
    console.log(rowsTemp[index]);
    setRows(rowsTemp);
  }

  const handleAddReceivingItem = (e, row) => {
    
    const recevingDetail = [{
      shop_sku:  row.shopSku,
      seller_sku: row.sellerSku,
      name: row.name,
      color: row.color,
      size: row.size,
      quantity_received: Number(row.value),
      quantity_approved: Number(row.value),
      price: Number(row.price)
    }]
    dispatch(addReceivingDetail(recevingDetail))
  }
  useEffect(() => {
    axiosHeroku.get(`/products/get?filter=${encodeURI(`all${searchProduct.statement}`)}`)
    .then(res => {
      console.log(`/products/get?filter=${encodeURI(`all${searchProduct.statement}`)}`);
      let products = Boolean(res.data.data.products) ? res.data.data.products : [] ;
      console.log(res.data.data);
      let rowsTemp = [];
      products.forEach(function(product, index){
        product.skus.forEach((sku, index)=>{
          let row = {};
          row.name= product.attributes.name;
          row.productId = product.item_id;
          row.shopSku = sku.ShopSku;
          row.sellerSku = sku.SellerSku;
          row.image = sku.Images[0];
          row.price = sku.price;
          row.specialPrice = Boolean(sku.special_price) ? sku.special_price : '-' ;
          row.quantity = Boolean(sku.available) ? sku.available : sku.quantity;
          row.color=sku.color_family;
          row.size=sku.size;
          row.status = sku.Status
          row.value = 1;
          rowsTemp.push(row);
        });
      });
      setRows(rowsTemp);
    })
  }, [searchProduct])

  return (
    <TableContainer style={{height: height}}>
    <Table size="small" stickyHeader>
    <TableHead>
      <TableRow>
        {dataHead.map((row)=>(
          <TableCell>
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index)=>(
        <TableRow>
          <TableCell>
            {row.name}
          </TableCell>
          <TableCell>
            <img style={{maxWidth: 50, maxHeight:50}} src={`${row.image}`}/>
          </TableCell>
          <TableCell>
            {row.sellerSku}
          </TableCell>
          <TableCell>
            {row.color} {row.size}
          </TableCell>
          <TableCell>
            {row.quantity}
          </TableCell>
          <TableCell>
            {row.price}
          </TableCell>
          <TableCell>
            <ButtonGroup size="small" button group>
            <Input name={`quantity`} size="small" defaultValue={1} required onChange={(e)=>{handleChangeQuantity(e, index)}} />
            <Button onClick={(e)=>handleAddReceivingItem(e, row)} >Thêm</Button>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
</Table>
    </TableContainer>
  )
}

export default OrderLocalForm
