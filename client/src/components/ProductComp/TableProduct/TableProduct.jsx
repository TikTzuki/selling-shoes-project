import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Box, Button, Collapse, Popover } from '@material-ui/core';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import customizeSort from '../../../ultils/sort';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/product';
import PopverButton from '../../PopoverButton/PopverButton';
import {sha256} from 'js-sha256';
import Axios from 'axios';
import { axiosHeroku, axiosJsonServer } from '../../../ultils/api';
import { Image } from '@material-ui/icons';

function createData(name, SellerSku, price, special_price, quantity, Status, actions) {
	return {
		name, SellerSku, price, special_price, quantity, Status, actions
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		//width: '100%',
	},
	paper: {
		//width: '100%',
		//marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

function TableProduct(props) {
	const searchProduct = useSelector(state => state.searchProduct);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('name');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = useState([])
	const {filter} = props;
	//const products = useSelector(state => state.productsState.products);
	let products = [];
	const fetchProducts = async () => {
		await axiosHeroku.get(`/products/get?filter=${encodeURI(`${filter}${searchProduct.statement}`)}`)
			.then(res => {
				console.log(`/products/get?filter=${encodeURI(`${filter}${searchProduct.statement}`)}`);
				let products = Boolean(res.data.data.products) ? res.data.data.products : [] ;
				console.log(res.data.data);
				let rowsTemp = [];
				products.forEach(function(product, index){
					product.skus.forEach((sku, index)=>{
						let row = {};
						row.name= product.attributes.name;
						row.productId = product.item_id;
						row.sellerSku = sku.SellerSku;
						row.image = sku.Images[0];
						row.price = sku.price;
						row.special_price = Boolean(sku.special_price) ? sku.special_price : '-' ;
						row.quantity = Boolean(sku.available) ? sku.available : sku.quantity;
						row.status = sku.Status
						rowsTemp.push(row);
					});
				});
				setRows(rowsTemp);
			})
	}
	useEffect(() => {
		fetchProducts();
	}, [])
	useEffect(()=>{
		fetchProducts();
	}, [searchProduct])
	const handleRequestSort = (event, property) => {
		const isAsc = (orderBy === property && order === 'asc');
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
		console.log(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{customizeSort.stableSort(rows, customizeSort.getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.product_name}
											selected={isItemSelected}
										>
											<TableCell component="th" id={labelId} scope="row" padding="none">
												<img style={{maxWidth:'10rem'}} src={`${row.image}`}/>
											</TableCell>
											<TableCell style={{maxWidth:'10rem'}} component="th" id={labelId} scope="row" padding="none">
												{row.name}
											</TableCell>
											<TableCell style={{maxWidth:'150px', wordWrap: 'break-word'}} align="left">{row.sellerSku}</TableCell>
											<TableCell align="left">{row.price}</TableCell>
											<TableCell align="left">{row.special_price}</TableCell>
											<TableCell align="left">{row.quantity}</TableCell>
											<TableCell align="left">{row.status}</TableCell>
											<TableCell align="left">
												<PopverButton itemTarget={{link: `/product/${row.productId}`}} />
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Dense padding"
			/>
		</div>
	);
}
export default TableProduct;