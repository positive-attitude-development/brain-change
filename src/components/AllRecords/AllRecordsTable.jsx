import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Paper} from '@material-ui/core';


import {Pageview} from '@material-ui/icons'
import {CSVLink} from 'react-csv';
import './AllRecords.css';

//dummy data
const rows = [
    { 
        firstname: 'Thomas',
        lastname: 'Roselyn',
        age: 87,
        gender: 'M',
        category: 'general public',
        state: 'MN',
        email: 'tgroselyn@gmail.com',
        phone: '425-761-8920',
        admin: 'Lyle Wildes'
    },
    {
        firstname: 'Rachel',
        lastname: 'Schoenmann',
        age: 99,
        gender: 'F',
        category: 'student',
        state: 'MN',
        email: 'rachels@gmail.com',
        phone: '555-121-2345',
        admin: 'Dane Smith'
    },
    {
        firstname: 'Jesse',
        lastname: 'Gjerde',
        age: 108,
        gender: 'M',
        category: 'coal miner',
        state: 'MN',
        email: 'jesseg@gmail.com',
        phone: '555-121-3459',
        admin: 'Dev Jana'
    },
    {
        firstname: 'Bobby',
        lastname: 'Khounphinith',
        age: 99,
        gender: 'M',
        category: 'offender',
        state: 'MN',
        email: 'bobbyk@gmail.com',
        phone: '425-761-8919',
        admin: 'Lyle Wildes'
    }
];

const headRows = [
    { key: 'firstname', label: 'First Name' },
    { key: 'lastname', label: 'Last Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'category', label: 'Category' },
    { key: 'state', label: 'State' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'admin', label: 'Admin Name' },
    { key: 'viewedit', label: 'View/Edit' },
];

//sorting function
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

//sorting function
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

//sorting function
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

//table head
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    //render table head
    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.key}
                        sortDirection={orderBy === row.key ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.key}
                            direction={order}
                            onClick={createSortHandler(row.key)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

//table head props
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

//table styles
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));

//table
export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('firstname');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //sorting function
    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    //pagination function
    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    //pagination function
    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
    }

    //empty row handler
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    //render table
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    {/* CSV exporter */}
                    <CSVLink
                        className="CSVLink"
                        filename={"brain-change-export.csv"}
                        data={rows}
                        headers={headRows}>
                        <Button variant="contained" color="primary">
                            Download My Data
                        </Button>
                    </CSVLink>
                    {/* table */}
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{row.firstname}</TableCell>
                                            <TableCell>{row.lastname}</TableCell>
                                            <TableCell>{row.age}</TableCell>
                                            <TableCell>{row.gender}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.state}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.admin}</TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <Pageview />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
