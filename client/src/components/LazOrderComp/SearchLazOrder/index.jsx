import { Button, Grid, Input, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Field, Form, withFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'recompose'
import * as Yup from 'yup'
import { searchLazOrderAct } from '../../../actions/searchLazOrder'

const formikForm = {
	mapPropsToValues() {
		return {
			created_before: ``,
			created_after: ``,
			update_before: ``,
			update_after: ``
		}
	},
	validationSchema: Yup.object().shape({
		create_after: Yup.date(),
		create_before: Yup.date()
	})

}
const useStyle = makeStyles((theme) => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

const SearchLazOrder = (props) => {
	const classes = useStyle();
	const { values } = props;
	const searchLazOrder = useSelector(state => (state.searchLazOrder))
	const dispatch = useDispatch();
	const handleSearch = (e) => {
		dispatch(searchLazOrderAct({...values}));
	}
	console.log(values)
	useEffect(() => {
		console.log("search laz order did mount")
	}, [])

	return (
		<div>
			<Grid container className={classes.container}>
				<Form>
					<Field
						name='created_after'
						render={({ field }) => (
							<TextField
								id="date"
								label="Ngày bắt đầu"
								type="date"
								inputProps={{ max: values.create_before }}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
								{...field}
							/>
						)}
					/>
					<Field
						name="created_before"
						render={({ field }) => (
							<TextField
								id="date2"
								label="Ngày kết thúc"
								type="date"
								inputProps={{ min: values.create_after }}
								className={classes.textField}
								onChange={(e) => { console.log(values) }}
								InputLabelProps={{
									shrink: true,
								}}
								{...field}
							/>
						)}
					/>

					<Button variant='outlined' onClick={handleSearch}>
						Tìm kiếm
			          </Button>

				</Form>
			</Grid>
		</div>
	)
}

export default compose(withFormik(formikForm))(SearchLazOrder)
