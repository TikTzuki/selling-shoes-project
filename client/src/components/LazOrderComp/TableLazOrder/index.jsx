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
import { Box, Collapse } from '@material-ui/core';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import customizeSort from '../../../ultils/sort';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import { useSelector } from 'react-redux';
import { axiosHeroku } from '../../../ultils/api';
import ExpandRow from './ExpandRow';

function createData(order_id, created_at, payment_method, price, items_count, status, subContents) {
	//let subContentArray = [...subContents];
	return {
		order_id,
		created_at,
		payment_method,
		price,
		items_count,
		status,
		subContents: subContents
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
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

const TableLazOrder = (props) => {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [expandedRow, setExpandedRow] = React.useState([]);
	const [rows, setRows] = useState([]);
	const searchLazOrder = useSelector(state => state.searchLazOrder);
	const {status} = props;

	const fectchOrders = async ()=>{
		await axiosHeroku.get(`/laz-orders/get?status=${encodeURI(`${status}${searchLazOrder.statement}`)}`).then(res=>{
			console.log(`/laz-orders/get?status=${encodeURI(`${status}${searchLazOrder.statement}`)}`);
			let orders = res.data.data.orders;
			console.log(searchLazOrder);
			console.log(orders);
			setRows(orders);
		})
	}

	const handleRequestSort = (event, property) => {
		const isAsc = (orderBy === property && order === 'asc');
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.order_id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleCheck = (event, order_id) => {
		const selectedIndex = selected.indexOf(order_id);
		let newSelected = [];

		if (selectedIndex === -1) { //Case newSelected array didn't constraint element then add the element
			newSelected = newSelected.concat(selected, order_id);
		} else { //Case newSelected constrain the element, delete the element from newSelected
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
		}
		setSelected(newSelected);
	};

	const handleExpand = (event, name) => {
		const expandedIndex = expandedRow.indexOf(name);
		let newExpandRow = [];
		if (expandedIndex === -1) {
			newExpandRow = newExpandRow.concat(expandedRow, name);
		} else {
			newExpandRow = newExpandRow.concat(expandedRow.slice(0, expandedIndex), expandedRow.slice(expandedIndex + 1));
		}
		console.log(expandedIndex);
		console.log(newExpandRow);
		setExpandedRow(newExpandRow);
	}
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

	//Did mount 1 lan
	useEffect(() => {
		fectchOrders();
	}, [])

	//Did update searchLazOrder
	useEffect(() => {
		fectchOrders();
	}, [searchLazOrder])

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar selected={selected} status={status} />
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
									const isItemSelected = isSelected(row.order_id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<>
											{/* Origin row */}
											<TableRow
												hover
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.order_id}
												selected={isItemSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox
														checked={isItemSelected}
														inputProps={{ 'aria-labelledby': labelId }}
														onClick={(event) => handleCheck(event, row.order_id)}
													/>
												</TableCell>
												<TableCell>
													<IconButton aria-label="expand row" onClick={(event) => handleExpand(event, row.order_id)}>
														{expandedRow.includes(row.order_id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
													</IconButton>
												</TableCell>
												<TableCell component="th" id={labelId} scope="row" padding="none">
													{row.order_id}
												</TableCell>
												<TableCell align="right">{row.created_at}</TableCell>
												<TableCell align="right">{row.payment_method}</TableCell>
												<TableCell align="right">{row.price}</TableCell>
												<TableCell align="right">{row.items_count}</TableCell>
												<TableCell align="right">{row.statuses[0]}</TableCell>
												<TableCell align="right">Sẵn sàng giao hàng/Huy</TableCell>
											</TableRow>
											{/* Table expanded */}
											<ExpandRow style={{width: `100%`}} open={expandedRow.includes(row.order_id)} order_id={row.order_id}/>
											{/*
											<TableRow>
												<TableCell style={{ padding: 0 }} colSpan={6}>
													<Collapse in={expandedRow.includes(row.name)}>
														<Box  margin={1}>
															<Typography>
																Table in table
                              									</Typography>
															<Table size="small" aria-label="purchases">
																<TableBody>
																	{																		
																		row.subContents.map((subContent => (
																			<TableRow key={subContent.order_item_id} border={"none"}>
																				<TableCell component="th" scope="row" padding="none">
																					{subContent.name}
																				</TableCell>
																				<TableCell align="right">

																				</TableCell>
																				<TableCell align="right">
																					<img style={{width: 100, height: "auto"}} src={subContent.product_main_image} alt="order-itemss" />
																				</TableCell>
																			</TableRow>
																		)))
																	}
																</TableBody>
															</Table>
														</Box>
													</Collapse>
												</TableCell>
											</TableRow> */}
										</>
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

export default TableLazOrder
