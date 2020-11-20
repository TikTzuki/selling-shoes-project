import { Button, List, ListItem, ListItemText, makeStyles, Popover } from '@material-ui/core'
import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
	listItem: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingTop: theme.spacing(0),
		paddingBottom: theme.spacing(0)
	},
	buttonEdit: {
		color: theme.palette.info.main,
		textTransform: "none",
	},
	buttonDelete: {
		color: theme.palette.error.main,
		textTransform: "none",
	}
}));

const PopverButton = (props) => {
	const itemTarget=props.itemTarget;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<>
			<Button aria-describedby={id} style={{ textTransform: "none" }} variant="text" color="secondary" onClick={handleClick}>
				Thao tác
				<ArrowDropDownIcon fontSize="small" />
			</Button>
			<Popover
				id={id}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
			>
				<List>
					<ListItem className={classes.listItem}>
						<Button className={classes.buttonEdit} to={itemTarget.link} variant="text" component={Link}>
							Sửa
						</Button>
					</ListItem>
					<ListItem className={classes.listItem}>
						<Button className={classes.buttonDelete} to='/' variant="text" component={Link}>
							Xóa
						</Button>
					</ListItem>
				</List>
			</Popover>
		</>
	)
}

export default PopverButton
