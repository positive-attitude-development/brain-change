import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, IconButton, MenuItem, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, TextField, InputAdornment} from '@material-ui/core';
import {CSVLink} from 'react-csv';
import {Pageview, Clear} from '@material-ui/icons'
import Swal from 'sweetalert2';
import './Admin.css';

//header rows for table and CSV export
const headRows = [
    { key: 'name', label: 'Name' },
    { key: 'organization', label: 'Organization' },
    { key: 'title', label: 'Title' },
    { key: 'email_address', label: 'Email' },
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'address', label: 'Mailing Address' },
    { key: 'state', label: 'State' },
    { key: 'level', label: 'Access Level' }
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
                <TableCell>View Participants</TableCell>
            </TableRow>
        </TableHead>
    );
}

//table head props
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

//table component
export default function EnhancedTable(props) {
    const {history} = props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //accessing redux store for table information
    let rows = useSelector(redux => redux.adminContactReducer);
    //dispatch hook
    let dispatch = useDispatch();

    //filter listed columns by search term
    const [searchTerm, setSearchTerm] = React.useState('');
    const filteredRows = rows.filter(x =>
        x['name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['organization'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['title'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['email_address'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['phone_number'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['address'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['state'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    //update access level after confirming via sweet alert
    function changeAccessLevel(id, level) {
        Swal.fire({
            title: 'Update access level?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                dispatch({type: 'UPDATE_ADMIN_LEVEL', payload: id, level: level});
                Swal.fire(
                    'Updated!',
                    '',
                    'success'
                )
            }
        })
    } //end changeAccessLevel

    //view participants
    function viewParticipants(name) {
        dispatch({type: 'SET_SEARCH_TERM', payload: name});
        history.push('/allparticipants');
    }

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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

    //render table
    return (
        <div className="container">
            <div className="wrapper">
                {/* CSV exporter */}
                <CSVLink
                    className="CSVLink"
                    filename={"brain-change-export.csv"}
                    data={filteredRows}
                    headers={headRows}>
                    <Button variant="contained" color="primary" size="large">
                        Export to CSV
                    </Button>
                </CSVLink>
                {/* search input */}
                <TextField
                    className="searchInput"
                    variant="outlined"
                    autoFocus
                    label="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    disabled={!searchTerm}
                                    onClick={e => setSearchTerm("")}
                                >
                                    <Clear color="inherit" fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {/* table */}
                <Table
                    className="table"
                    aria-labelledby="tableTitle"
                >
                    {/* table head */}
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={filteredRows.length}
                    />
                    {/* table body */}
                    <TableBody>
                        {/* map through search-filtered rows to create table rows */}
                        {stableSort(filteredRows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.organization}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.email_address}</TableCell>
                                        <TableCell>{row.phone_number}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.state}</TableCell>
                                        <TableCell>
                                            {/* admin access level dropdown */}
                                            <TextField
                                                disabled={row.level === 5}
                                                select
                                                value={row.level}
                                                className="levelField"
                                                onChange={e => changeAccessLevel(row.id, e.target.value)}
                                                >
                                                <MenuItem value={1}>Deactivated</MenuItem>
                                                <MenuItem value={2}>Pending</MenuItem>
                                                <MenuItem value={3}>Admin</MenuItem>
                                                <MenuItem value={4}>Owner</MenuItem>
                                                <MenuItem disabled value={5}>Owner (Locked)</MenuItem>
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={e => {viewParticipants(row.name)}}>
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
            {/* pagination at bottom of table */}
            <TablePagination
                rowsPerPageOptions={[10, 20]}
                component="div"
                count={filteredRows.length}
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
        </div>
    );
}