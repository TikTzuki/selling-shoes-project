import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { AppBar, Box, Button, FormHelperText, Grid, Input, makeStyles, Tab, Tabs, TextField, Typography } from '@material-ui/core'
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

const checkPassword=(password, oldPassword, newPassword, newPasswordConfirm)=>{
	if( Boolean(oldPassword) && Boolean(newPassword) && Boolean(newPasswordConfirm) ){
		if(password===oldPassword)
		return 1
	}
	if( !Boolean(oldPassword) && !Boolean(newPassword) && !Boolean(newPasswordConfirm) ){
		return 0
	}
	return -1
}
const UserPage = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const user = useSelector(state => state.user)
	const [openModal, setOpenModal] = useState(false);
	const [messageModal, setMessageModel] = useState('');
	const dispatch = useDispatch()
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	return (<div className={classes.root}>
		<AppBar position="static">
			<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
				<Tab label="Thông tin tài khoản" {...a11yProps(0)} />
				<Tab label="Thông tin..." {...a11yProps(1)} />
				<Tab label="Thông tin..." {...a11yProps(2)} />
			</Tabs>
		</AppBar>
		<TabPanel value={value} index={0}>
			<Formik
				initialValues={{
					...user,
					oldPassword: '',
					newPassword: '',
					newPasswordConfirm: ''
				}}
				validationSchema={Yup.object().shape({
					oldPassword: Yup.string(),
					newPassword: Yup.string(),
					newPasswordConfirm: Yup.string().test('match','Password khong khop', function(newPasswordConfirm){
						return newPasswordConfirm === this.parent.newPassword;
					})
				})}
				onSubmit={(values, actions) => {
					let newInfo = {...values};

					if(checkPassword(newInfo.password, newInfo.oldPassword, newInfo.newPassword, newInfo.newPasswordConfirm)===1){
						//case change password
						let newUser = {...values};
						newUser.password = values.newPassword;
						delete newUser.oldPassword;
						delete newUser.newPassword;
						delete newUser.newPasswordConfirm;
						updateUser(newUser);
					} else{
						//case  not change password
						if(checkPassword(newInfo.password, newInfo.oldPassword, newInfo.newPassword, newInfo.newPasswordConfirm)===0){
							let newUser = {...values};
							delete newUser.oldPassword;
							delete newUser.newPassword;
							delete newUser.newPasswordConfirm;
						updateUser(newUser);
						} else {
							//case wrong password
							setMessageModel('Sai mật khẩu')
							setOpenModal(true);
						}
					}

					async function updateUser(user){
						await axiosJsonServer.put(`/seller_account/${user.id}`, user)
						.then(res=>{
							console.log(res);
							setMessageModel('Sửa thành công')
							setOpenModal(true);
							localStorage.setItem('seller-account', JSON.stringify(res.data));
						dispatch(updateUserAction(res.data));
						});
					}
					actions.resetForm();
					actions.setSubmitting(true);
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
									id="oldPassword"
									name="oldPassword"
									render={({ field }) =>
										<TextField
											className={classes.field}
											fullWidth
											type="password"
											label="Mật khẩu cũ"
											{...field} />
									} />
								<Field
									id="newPassword"
									name="newPassword"
									render={({ field }) =>
										<TextField
											className={classes.field}
											fullWidth
											type="password"
											label="Mật khẩu mới"
											{...field} />
									} />
									<Field
									id="newPasswordConfirm"
									name="newPasswordConfirm"
									render={({ field }) =>
										<TextField
											className={classes.field}
											fullWidth
											type="password"
											label="Nhập lại mật khẩu mới"
											{...field} />
									} />
									{<FormHelperText error>{props.errors.newPasswordConfirm}</FormHelperText>}
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
			Thông tin...
        </TabPanel>
		<TabPanel value={value} index={2}>
			Thông tin...
        </TabPanel>
		<ConfirmModel title={messageModal} message={messageModal} open={openModal} onClose={()=>(setOpenModal(!openModal))} />
	</div>)
}

export default (UserPage)