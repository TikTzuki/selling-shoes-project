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

const styles = (theme) => {
	return {
		paper: {
			padding: '20px 15px',
			marginTop: '30px'
		},
		submit: {
			backgroundColor: theme.palette.primary.main,
		}
	}
}
const formikForm = {
	mapPropsToValues() { // Init form field
		return {
			first_name: '',
			last_name: '',
			phone_number: '',
			email: '',
			password: ''
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
	const { classes, values, handleChange, errors, setFieldValue, multitheme } = props;
	const handleSubmit = () => {
		let data = {
			first_name: 'tik',
			last_name: 'tok',
			phone_number: '098093507894',
			email: 'hahaha',
			password: 'hehehehe'
		}
		axiosJsonServer.post('seller_account', data)
		.then(res=>{console.log(res.data)})
	}

	return (
		<Grid container justify='center' alignContent='center'>
			<Grid item xs={6} md={4}>
				<Paper elevation={4} className={classes.paper}>
					<Typography variant="headline" gutterBottom>
						Signup
          </Typography>
					<Form onSubmit={handleSubmit}>
						<FormControl fullWidth margin='normal' error={errors.username}>
							<InputLabel>Username</InputLabel>
							<Field
								name='username'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.username && <FormHelperText>{errors.username}</FormHelperText>}
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
						<FormControl fullWidth margin='normal' error={errors.password}>
							<InputLabel>Password</InputLabel>
							<Field
								name='password'
								render={({ field }) => (
									<Input fullWidth {...field} />
								)} />
							{props.touched.password && <FormHelperText>{errors.password}</FormHelperText>}
						</FormControl>
						<FormControl >
							<InputLabel htmlFor="upload-photo">File
							<Input
								style={{display:"none"}}
								id="upload-photo"
								name="fileInput"
								type="file"
								onChange={handleChange}
								value={values.fileInput}
							/>
							<Button color="primary" variant="contained" component="span">
								Upload button
        			</Button>{" "}
							</InputLabel>
						</FormControl>
						<FormControl>
							<InputLabel>
							File</InputLabel>
							<Input
							type="file"
							name="file"
							onChange={handleChange("file")}/>
						</FormControl>
						<FormControl fullWidth margin='normal'>
							<InputLabel>Plan</InputLabel>
							<Select
								displayEmpty
								name='plan'
								value={values.plan}
								onChange={handleChange}
							>
								<MenuItem value='basic'>Basic</MenuItem>
								<MenuItem value='advance'>Advance</MenuItem>
								<MenuItem value='enterprise'>Enterprise</MenuItem>
							</Select>
						</FormControl>
						<Field
							name='receiveLetter'
							type='checkbox'
							render={({ field }) => (
								<FormControlLabel
									control={
										<Checkbox {...field} />
									}
									label='Receive new letter'
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
					</Form>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default compose(withFormik(formikForm), withStyles(styles))(SignUpPage)
