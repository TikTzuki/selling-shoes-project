import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button, List, ListItem, Popover } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';
import { axiosHeroku } from '../../../../ultils/api';

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light' || theme.palette.type === 'golden'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
		//maxWidth: '10rem'
		//paddingRight: theme.spacing(2)
	},
	listPopver: {
		padding: theme.spacing(0)
	}
}));
const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { selected, status } = props;
	const [anchorElPrint, setAnchorElPrint] = React.useState(null);
	const [anchorElStatus, setAnchorElStatus] = React.useState(null);
	const openPrint = Boolean(anchorElPrint);
	const openStatus = Boolean(anchorElStatus);
	const idPrint = openPrint ? 'simple-popover' : undefined;
	const idStatus = openStatus ? 'simple-popover' : undefined;

	const handlePopverPrint = (e) => {
		setAnchorElPrint(e.currentTarget);
	}
	const handleClosePrint = () => {
		setAnchorElPrint(null);
	};
	const handlePopverStatus = (e) => {
		setAnchorElStatus(e.currentTarget);
	}
	const handleCloseStatus = () => {
		setAnchorElStatus(null);
	};
	const handleReadyToShip=(e,selected)=>{
		console.log("selected ",selected);
		axiosHeroku.get(`laz-orders/items/get?order_ids=${encodeURI(`[${selected.toString()}]`)}`)
		.then(res=>{
			let orders = res.data.data;
			orders.forEach(order => {
				order.order_items.forEach((order_item)=>{
					axiosHeroku.post(`laz-orders/invoice_number/set?order_item_id=${order_item.order_item_id}&invoice_number=1`)
					.then(res=>{
						console.log(res)
					})
				})
			});
		})
		//axiosHeroku.post(`laz-orders/invoice_number/set?order_item_id=${item.}`, )
	}
	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: selected.length > 0,
			})}
		>
			{selected.length > 0 ? (<>
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					<Button aria-describedby={idPrint} variant="outlined" color="inherit" size="small" onClick={handlePopverPrint}>
						In tài liệu
						<ArrowDropDownIcon fontSize="small" />
					</Button>
					<Popover
						id={idPrint}
						anchorEl={anchorElPrint}
						onClose={handleClosePrint}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={openPrint}
					>
						<List>
							<ListItem className={classes.listPopver} >
								<Button color="secondary" size="small" variant="text" fullWidth>
									In hóa đơn
						</Button>
							</ListItem>
							<ListItem className={classes.listPopver}>
								<Button color="secondary" size="small" variant="text" fullWidth>
									In tem vận chuyển
						</Button>
							</ListItem>
						</List>
					</Popover>
					{/* Status */}
					{status === 'pending' || status === 'ready_to_ship' ? (
						<><Button aria-describedby={idStatus} style={{ marginLeft: '2rem' }} size="small" color="inherit" variant="outlined" onClick={handlePopverStatus}>
							Chuyển trạng thái
					<ArrowDropDownIcon fontSize="small" />
						</Button>
							<Popover
								id={idStatus}
								anchorEl={anchorElStatus}
								onClose={handleCloseStatus}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={openStatus}
							>
								<List>
									<ListItem className={classes.listPopver}>
										<Button color="secondary" variant="text" onClick={(e)=>handleReadyToShip(e,selected)} fullWidth size="small">
											Sẵn sàng giao hàng
										</Button>
									</ListItem>
									<ListItem className={classes.listPopver}>
										<Button color="secondary" variant="text" fullWidth size="small">
											Hủy
									</Button>
									</ListItem>
								</List>
							</Popover></>
					) : (<></>)}
				</Typography>
			</>
			) : (
					<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
						Hóa đơn lazada
					</Typography>
				)}
			{selected.length > 0 ? (
				<Tooltip title="Delete">
					<Typography align="right" className={classes.title} color="inherit" variant="subtitle1" component="div">
						{selected.length} selected
					</Typography>
				</Tooltip>
			) : (<></>)}
			{/*numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
					<Tooltip title="Filter list">
						<IconButton aria-label="filter list">
							<FilterListIcon />
						</IconButton>
					</Tooltip>
			)*/}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	//numSelected: PropTypes.number.isRequired,
};
export default EnhancedTableToolbar;