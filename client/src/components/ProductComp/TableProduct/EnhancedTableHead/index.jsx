import React from 'react'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';
/* load data Head */
const headCells = [
	{ id: 'image', numeric: false, disablePadding: false, label: 'Hình ảnh', isSort: false },
	{ id: 'name', numeric: false, disablePadding: false, label: 'Tên', isSort: true },
	{ id: 'sellerSku', numeric: false, disablePadding: false, label: 'Seller SKU', isSort: true },
	{ id: 'originPrice', numeric: false, disablePadding: false, label: 'Giá gốc', isSort: true },
	{ id: 'price', numeric: false, disablePadding: false, label: 'Giá bán' , isSort: true},
	{ id: 'available', numeric: false, disablePadding: false, label: 'Sẵn có' , isSort: true},
	{ id: 'status', numeric: false, disablePadding: false, label: 'Hiển thị' , isSort: true},
	{ id: 'actions', numeric: false, disablePadding: false, label: 'Thao tác' , isSort: false}
];

const useStyles = makeStyles((theme)=>({
	tableCell: {
		paddingLeft: theme.spacing(0),
		paddingRight: theme.spacing(0)
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
	}
}))

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const classes = useStyles();
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					headCell.isSort ? (<TableCell
						className={classes.tableCell}
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}

					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>) : (
							<TableCell
							className={classes.tableCell}
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'default'}
							sortDirection={orderBy === headCell.id ? order : false}>
								{headCell.label}
							</TableCell>
						)
				))}
			</TableRow>
		</TableHead>
	);
}
EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;