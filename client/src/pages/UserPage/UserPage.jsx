import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { AppBar, Box, Button, Grid, Input, makeStyles, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import { Field, Form, Formik, useFormik, withFormik } from 'formik';
import { compose } from 'recompose';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { axiosJsonServer } from '../../ultils/api';
import ConfirmModel from '../../components/ConfirmModel/ConfirmModel';
import {updateUserAction} from '../../actions/user';
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	field: {
		margin: theme.spacing(2)
	}
}));

const formikForm = {
	mapPropsToValues: ()=>({
		first_name: "bu",
		last_name: "lon",
		email: "chi Thien"
	}),
	validationSchema: Yup.object().shape({

	}),
	onSubmit: (values, {setSubmitting})=>{
		alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
	}
}
const UserPage = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const user = useSelector(state => state.user)
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch()
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	return (<div className={classes.root}>
		<AppBar position="static">
			<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
				<Tab label="Thông tin tài khoản" {...a11yProps(0)} />
				<Tab label="Item Two" {...a11yProps(1)} />
				<Tab label="Item Three" {...a11yProps(2)} />
			</Tabs>
		</AppBar>
		<TabPanel value={value} index={0}>
			<Formik
				initialValues={{
					...user
				}}
				onSubmit={(values, actions) => {
					async function updateUser(){
						await axiosJsonServer.put(`/seller_account/${values.id}`, values)
						.then(res=>{
							console.log(res);
							setOpenModal(true);
							localStorage.setItem('seller-account', JSON.stringify(res.data));
						dispatch(updateUserAction(res.data));
						});
					}
					updateUser();
					actions.setSubmitting(false);
				}}
			>
				{(props) => (
					<Form onSubmit={props.handleSubmit} >
						<Grid item xs={4}>
							<Grid container>

								<Field
									id="first_name"
									name="first_name"
									render={({ field }) =>
										<TextField
											className={classes.field}
											label="Họ"
											fullWidth
											{...field} />
									} />
								<Field
									id="last_name"
									name="last_name"
									render={({ field }) =>
										<TextField
											label="Tên"
											className={classes.field}
											fullWidth
											{...field} />
									} />
								<Field
									id="phone_number"
									name="phone_number"
									render={({ field }) =>
										<TextField
											label="Số điện thoại"
											className={classes.field}
											fullWidth
											{...field} />
									} />
								<Field
									id="email"
									name="email"
									render={({ field }) =>
										<TextField
											label="Email"
											className={classes.field}
											fullWidth
											{...field} />
									} />
								<Field
									id="password"
									name="password"
									render={({ field }) =>
										<TextField
											className={classes.field}
											fullWidth
											label="Mật khẩu"
											{...field} />
									} />
							</Grid>
						</Grid>
						<Button
							type="submit">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</TabPanel>
		<TabPanel value={value} index={1}>
			Item Two
        </TabPanel>
		<TabPanel value={value} index={2}>
			Item Three
        </TabPanel>
		<ConfirmModel title={'Sửa thành công'} message={'Sửa thành công'} open={openModal} onClose={()=>(setOpenModal(!openModal))} />
	</div>)
}

export default (UserPage)