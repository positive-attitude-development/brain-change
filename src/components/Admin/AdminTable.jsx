import React from 'react';
import PropTypes from 'prop-types';
import {Button, IconButton, Table, TableBody, TableCell, 
        TableHead, TablePagination, TableRow, TableSortLabel, TextField, 
        InputAdornment, Paper} from '@material-ui/core';

import {Pageview, Clear} from '@material-ui/icons'
import {CSVLink} from 'react-csv';




const headRows = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'organization', label: 'Organization' },
    { key: 'title', label: 'Title'},
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'email_address', label: 'Email' },
    { key: 'level', label: 'Access Level' }
];


// function asignrows(props) {
//     const adminRows = [props.contactInfo]
// }

// export default function admintable() {

//     console.log(props.contactInfo)
//     return (
//         <>
//         assignrows();
//         the table
//         {JSON.stringify(adminRows)}
//         </>
//     )
// }; 


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

//table props
EnhancedTable.propTypes = {
        search: PropTypes.string.isRequired,
        contactInfo: PropTypes.array.isRequired
    };

//table
export default function EnhancedTable(props) {
    const {contactInfo, search} = props; 
    const rows = React.useState(contactInfo)
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('firstname');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //filter by search term

    const [searchTerm, setSearchTerm] = React.useState(search);
    const filteredRows = rows.filter(x =>
        x['first_name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['last_name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['organization'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['title'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['phone_number'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['email_address'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        x['level'].toString().includes(searchTerm) 
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
            <Paper className="paper">
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
                                            <TableCell>{row.first_name}</TableCell>
                                            <TableCell>{row.last_name}</TableCell>
                                            <TableCell>{row.organization}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.phone_number}</TableCell>
                                            <TableCell>{row.email_address}</TableCell>
                                            <TableCell>{row.level}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>
                                                <Button> 
                                                    View Participants
                                                </Button>
                                            </TableCell>
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
            </Paper>
        </div>
    );
}