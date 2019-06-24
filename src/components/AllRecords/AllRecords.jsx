import React, {Component} from 'react';
import AllRecordsTable from './AllRecordsTable';
import './AllRecords.css';

class AllRecords extends Component {
    render() {
        return (
            <div>
                <h2>All Records:</h2>
                <AllRecordsTable />
            </div>
        )
    }
}

export default AllRecords;