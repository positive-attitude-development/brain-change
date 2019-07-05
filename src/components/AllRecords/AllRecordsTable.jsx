import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types';
import {Button, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, TextField, InputAdornment, Paper} from '@material-ui/core';
import {Pageview, Clear} from '@material-ui/icons'
import {CSVLink} from 'react-csv';
import './AllRecords.css';

const headRows = [
    { key: 'participant_name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'category', label: 'Category' },
    { key: 'state', label: 'State' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'admin_name', label: 'Admin Name' },
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
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

//table
export default function EnhancedTable(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('participant_name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //accessing redux store for table and search information
    let rows = useSelector(redux => redux.allRecordsReducer);
    let search = useSelector(redux => redux.searchTermReducer);

    //filter by search term
    const [searchTerm, setSearchTerm] = React.useState(search);
    const filteredRows = rows.filter(x =>
        x['participant_name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['age'].toString().includes(searchTerm) ||
        x['gender'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['category'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['state'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['email'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['phone'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['admin_name'].toLowerCase().includes(searchTerm.toLowerCase())
    )

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
            <div className="wrapper">
                {/* table */}
                <Table
                    className="table"
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={filteredRows.length}
                    />
                    <TableBody>
                        {stableSort(filteredRows, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{row.participant_name}</TableCell>
                                        <TableCell>{row.age}</TableCell>
                                        <TableCell>{row.gender}</TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.state}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>{row.admin_name}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => props.history.push(`/individualparticipant/${row.participant_id}`)} >
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