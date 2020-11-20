import { Button, Grid, Input, makeStyles } from '@material-ui/core'
import { Field, withFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import getThemeByName from '../../../ultils/themes/base';

const formik = {
	mapPropsToValues() {
		return {
			name: ``,
			sellerSku: ``
		}
	}
}
const useStyle = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(3),
	},
	searchItem: {
		paddingLeft: theme.spacing(3)
	}
}))
const SearchProduct = (props) => {
	const values = props.values;
	const classes = useStyle();
	const searchProduct = useSelector(state => state.searchProduct)
	const dispatch = useDispatch();
	console.log(searchProduct);

	const handleClick = (event) => {
		let searchObject = {
			name: values.name,
			sellerSku: values.sellerSku
		}
		dispatch({ type: 'SEARCH', payload: searchObject })
	}
	
	return (
		<div>
			<Grid container className={classes.container}>
				<Grid item xs={2}>
					<Button> Thêm sản phẩm </Button>
				</Grid>
				<Grid item xs={2} className={classes.searchItem}>
					<Field
						name='name'
						render={({ field }) => (
							<Input {...field} placeholder={`Tên sản phẩm${searchProduct.name}`} />
						)}
					/>
				</Grid>
				<Grid item xs={2} className={classes.searchItem}>
					<Field
						name='sellerSku'
						render={({field})=>(
							<Input {...field} placeholder={`Seller Sku`} />
						)}
					/>
				</Grid>
				<Grid item xs={2} className={classes.searchItem}>
					<Button variant='outlined' onClick={handleClick}>
						Tìm kiếm
          </Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default compose(withFormik(formik))(SearchProduct);
