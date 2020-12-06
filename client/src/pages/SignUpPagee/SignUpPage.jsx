import {
	Button,
	Checkbox,
	Fab,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	Input,
	InputLabel,
	Link,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	Typography
} from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from '@material-ui/styles'
import { withFormik, Form, Field } from 'formik'
import React from 'react'
import { compose } from 'recompose'
import * as Yup from 'yup'
import axios from 'axios'
import { axiosJsonServer } from '../../ultils/api';
import {Link as RouteLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => {
	return {
		paper: {
			padding: '20px 15px',
			marginTop: '30px'
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
}
function SignUpPage(props) {
	const classes = useStyles();
	const { values, handleChange, errors, setFieldValue, multitheme } = props;
	const handleSubmit = () => {
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
		console.log(values);
		//axiosJsonServer.post('seller_account', data)
		//.then(res=>{console.log(res.data)})
	}
/*
	return (
		<Grid container justify='center' alignContent='center' className={classes.signUpBackground}>
			<Grid item xs={6} md={4}>
				<Paper elevation={4} className={classes.paper}>
					<Typography variant="headline" gutterBottom>
						Đăng ký
          </Typography>

					<Form onSubmit={handleSubmit}>

						<FormControl margin='normal' error={errors.first_name}>
							<InputLabel>Họ</InputLabel>
							<Field
								name='first_name'
								render={({ field }) => (
									<Input f {...field} />
								)} />
							{props.touched.first_name && <FormHelperText>{errors.first_name}</FormHelperText>}
						</FormControl>

						<FormControl margin='normal' error={errors.last_name}>
							<InputLabel>Tên</InputLabel>
							<Field
								name='last_name'
								render={({ field }) => (
									<Input {...field} />
								)} />
							{props.touched.last_name && <FormHelperText>{errors.last_name}</FormHelperText>}
						</FormControl>

						<FormControl fullWidth margin='normal' error={errors.email}>
							<InputLabel>Email</InputLabel>
							<Field
								name='email'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.email && <FormHelperText>{errors.email}</FormHelperText>}
						</FormControl>

						<FormControl fullWidth margin='normal' error={errors.phone_number}>
							<InputLabel>Phone number</InputLabel>
							<Field
								name='phone_number'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.phone_number && <FormHelperText>{errors.phone_number}</FormHelperText>}
						</FormControl>

						<FormControl fullWidth margin='normal' error={errors.password}>
							<InputLabel>Password</InputLabel>
							<Field
								name='password'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.password && <FormHelperText>{errors.password}</FormHelperText>}
						</FormControl>

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

					</Form>
				</Paper>
			</Grid>
		</Grid>
	)*/return (<div style={{width: `100%`, height:`100vh`, backgroundColor:"#000"}}></div>)
}

export default withFormik(formikForm)(SignUpPage)
