import { Button, Grid, Input, makeStyles, TextField } from '@material-ui/core'
import { Field, Form, withFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import * as Yup from 'yup';
import { searchProductAction } from '../../../../actions/searchProduct';
const formik = {
	mapPropsToValues() {
		return {
			filter: ``,
			create_after: ``,
			create_before: ``,
			update_after: ``,
			update_before: ``,
			sku_seller_list: ``,
			search: ``
		}
	},
	validationSchema: Yup.object().shape({
		create_after: Yup.date(),
		create_before: Yup.date(),
		update_after: Yup.date(),
		update_before: Yup.date()
	})
}
const useStyle = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(3),
	},
	searchItem: {
		paddingLeft: theme.spacing(3)
	},
	textField: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		maxWidth: "10rem"
	}
}))
const SearchProduct = (props) => {
	const values = props.values;
	const classes = useStyle();
	const searchProduct = useSelector(state => state.searchProduct)
	const dispatch = useDispatch();
	console.log(searchProduct);

	const handleSearch = (event) => {
		dispatch(searchProductAction({...values}));
	}

	return (
		<div>
			<Grid container className={classes.container}>
				<Grid item xs={2}>
					<Button variant="contained" color="default"> Thêm sản phẩm </Button>
				</Grid>
				<Form>
					<Field
						name='create_after'
						render={({field})=>(
							<TextField
							size="small"
							type="date"
							label="Ngày tạo-từ"
							InputLabelProps={{
								shrink: true,
							}}
							color="secondary"
							className={classes.textField}
							{...field}/>
						)}
					/>
					<Field
						name='create_before'
						render={({field})=>(
							<TextField
							size="small"
							type="date"
							label="Ngày tạo-đến"
							InputLabelProps={{
								shrink: true,
							}}
							color="secondary"
							className={classes.textField}
							{...field}/>
						)}
					/>
					<Field name='search'
						render={({field})=>(
							<TextField
							label="Tên sản phẩm"
							size="small"
							color="secondary"
							className={classes.textField}
							{...field}/>
						)}
					/>
					<Field name='sku_seller_list'
						render={({field})=>(
							<TextField
							label="Seller Sku"
							size="small"
							color="secondary"
							className={classes.textField}
							{...field}/>
						)}
					/>
					<Button variant='contained' color="default" onClick={handleSearch}>
						Tìm kiếm
          </Button>
				</Form>
			</Grid>
		</div>
	)
}

export default compose(withFormik(formik))(SearchProduct);
