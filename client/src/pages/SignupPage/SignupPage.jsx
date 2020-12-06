import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, FormControl, FormHelperText, IconButton, Input, InputLabel } from '@material-ui/core';

import { Field, Form, withFormik } from 'formik';
import {Link as RouteLink} from 'react-router-dom';
import * as Yup from 'yup';
import { compose } from 'recompose';
import LoginForm from '../../components/LoginForm';
import { axiosJsonServer } from '../../ultils/api';

const useStyles = makeStyles((theme) => {
	return {
		paper: {
			padding: '20px 15px',
			display: 'flex'
		},
		submit: {
			backgroundColor: theme.palette.primary.main,
		},
		signUpBackground: {
			backgroundImage: 'url(https://source.unsplash.com/random)',
			backgroundRepeat: 'no-repeat',
			backgroundColor:
				theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			zIndex: '0',
			height: `100vh`,
		}
	}
})

const formikForm = {
	mapPropsToValues() { // Init form field
		return {
			first_name: '',
			last_name: '',
			phone_number: '',
			email: '',
			password: '',
			laz_app_key: "",
      laz_app_secret: "",
      laz_access_token: "",
      laz_access_expires: null,
      laz_refresh_token: "",
      laz_refresh_expires: null
		}
	},
	validationSchema: Yup.object().shape({
		first_name: Yup.string()
			.required('First name is required')
			.min(1, 'First name must have min 1 character')
			.max(200, 'First name have max 10 chareacters'),
		last_name: Yup.string()
			.required('Last name is required')
			.min(1, 'Last name must have min 1 character')
			.max(200, 'Last name have max 10 chareacters'),
		email: Yup.string()
			.email('Email is invalid'),
		phone_number: Yup.string()
			.required('Phone number is required'),
		password: Yup.string()
			.required('Password is required')
			.min(8, 'Password must have min 8 character'),
	}),
	handleSubmit: (values, formikBag)=>{
		let data = {
			first_name: 'tik',
			last_name: 'tok',
			phone_number: '098093507894',
			email: 'hahaha',
			password: 'hehehehe',
			laz_app_key: "",
      laz_app_secret: "",
      laz_access_token: "",
      laz_access_expires: null,
      laz_refresh_token: "",
      laz_refresh_expires: null
		}
		axiosJsonServer.post('seller_account', values)
		.then(res=>{
			if(res.status===201){
				alert("Tạo tài khoản thành công");
			}
			else
				alert("Tạo tài khoản thất bại");
		})
	}
}
function SignupPage(props) {
	const classes = useStyles();
	const { values, handleChange, errors, setFieldValue, multitheme, handleSubmit } = props;
	return (
		<Grid container justify='center' alignItems="center" className={classes.signUpBackground}>
			<CssBaseline/>
			<Grid item xs={12} md={4}>

					<Form onSubmit={handleSubmit}>

					<Grid container component={Paper} elevation={4} className={classes.paper}>
					<Grid item xs={12} >
						<Typography variant="subtitle2" gutterBottom>
						Đăng ký
						</Typography>
          </Grid>
						<Grid item xs={12} md={6}>
						<FormControl margin='normal' error={errors.first_name}>
							<InputLabel>Họ</InputLabel>
							<Field
								name='first_name'
								render={({ field }) => (
									<Input f {...field} />
								)} />
							{props.touched.first_name && <FormHelperText>{errors.first_name}</FormHelperText>}
						</FormControl>
						</Grid>
						

						<Grid item xs={12} md={6}>
						<FormControl margin='normal' error={errors.last_name}>
							<InputLabel>Tên</InputLabel>
							<Field
								name='last_name'
								render={({ field }) => (
									<Input {...field} />
								)} />
							{props.touched.last_name && <FormHelperText>{errors.last_name}</FormHelperText>}
						</FormControl>
						</Grid>

						<Grid item xs={12} >
						<FormControl fullWidth margin='normal' error={errors.email}>
							<InputLabel>Email</InputLabel>
							<Field
								name='email'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.email && <FormHelperText>{errors.email}</FormHelperText>}
						</FormControl>
						</Grid>

						<Grid item xs={12}>
						<FormControl fullWidth margin='normal' error={errors.phone_number}>
							<InputLabel>Phone number</InputLabel>
							<Field
								name='phone_number'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.phone_number && <FormHelperText>{errors.phone_number}</FormHelperText>}
						</FormControl>
						</Grid>

						<Grid item xs={12}>
						<FormControl fullWidth margin='normal' error={errors.password}>
							<InputLabel>Password</InputLabel>
							<Field
								name='password'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.password && <FormHelperText>{errors.password}</FormHelperText>}
						</FormControl>
						</Grid>


						<Field
							name='argee'
							type='checkbox'
							render={({ field }) => (
								<FormControlLabel
									control={
										<Checkbox {...field} />
									}
									label='Đồng ý với đều khoản sử dụng?'
								/>
							)} />

						<FormControl fullWidth margin='normal'>
							<Button
								variant='contained'
								color='primary'
								type='submit'
							>
								Signup
              </Button>
						</FormControl>

						<Link to={`/`} component={RouteLink}> Đã có tài khoản? Đăng nhập. </Link>
						</Grid>
					</Form>
			</Grid>
		</Grid>
  )
}

export default compose(withFormik(formikForm))(SignupPage);