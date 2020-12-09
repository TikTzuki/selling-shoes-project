import { Button, Grid, Input, makeStyles, TextField } from '@material-ui/core'
import { Field, Form, withFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { searchProductAction } from '../../../actions/searchProduct';
import getThemeByName from '../../../ultils/themes/base';
import * as Yup from 'yup';
import { Link as RouteLink } from 'react-router-dom'
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
		padding: theme.spacing(3)
	},
	searchItem: {
		paddingLeft: theme.spacing(3)
	},
	textField: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		maxWidth: "10rem"
	},
	btnAddProduct:{
		textAlign: `center`
	}
}))
const SearchProduct = (props) => {
	const values = props.values;
	const classes = useStyle();
	const searchProduct = useSelector(state => state.searchProduct)
	const dispatch = useDispatch();
	console.log(searchProduct);

	const handleSearch = (event) => {
		dispatch(searchProductAction({ ...values }));
	}

	return (
			<Grid container className={classes.container}>
				<Form>
					<Grid container>
						<Grid item style={{padding: `0px 10px 10px 0px`}}>
							<Button variant="contained" size="medium" to={`/product/newpublish`} className={classes.btnAddProduct} component={RouteLink}>Thêm sản phẩm</Button>
						</Grid>
						<Grid item >
							<Field
								name='create_after'
								render={({ field }) => (
									<TextField
										size="small"
										type="date"
										label="Ngày tạo-từ"
										InputLabelProps={{
											shrink: true,
										}}
										color="secondary"
										className={classes.textField}
										{...field} />
								)}
							/>
							<Field
								name='create_before'
								render={({ field }) => (
									<TextField
										size="small"
										type="date"
										label="Ngày tạo-đến"
										InputLabelProps={{
											shrink: true,
										}}
										color="secondary"
										className={classes.textField}
										{...field} />
								)}
							/>
						</Grid>
						<Grid item>
							<Field name='search'
								render={({ field }) => (
									<TextField
										label="Tên sản phẩm"
										size="small"
										color="secondary"
										className={classes.textField}
										{...field} />
								)}
							/>
							<Field name='sku_seller_list'
								render={({ field }) => (
									<TextField
										label="Seller Sku"
										size="small"
										color="secondary"
										className={classes.textField}
										{...field} />
								)}
							/>
						</Grid>
						<Grid item style={{padding: `10px 0 0 0`}}>
							<Button variant='contained' color="default" onClick={handleSearch}>
								Tìm kiếm
          		</Button>
						</Grid>
					</Grid>
				</Form>
			</Grid>
	)
}

export default compose(withFormik(formik))(SearchProduct);
