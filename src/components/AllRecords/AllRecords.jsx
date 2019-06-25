import React, {Component} from 'react';
import {connect} from 'react-redux';
import AllRecordsTable from './AllRecordsTable';
import './AllRecords.css';

class AllRecords extends Component {
    render() {
        return (
            <div>
                <h2>All Records:</h2>
                <AllRecordsTable search={this.props.searchTerm || ""} />
            </div>
        )
    }
}

const mapRedux = redux => {
    return {
        searchTerm : redux.searchTermReducer
    }
}

export default connect(mapRedux)(AllRecords);