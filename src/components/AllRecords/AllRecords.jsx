import React, {Component} from 'react';
import {connect} from 'react-redux';
import AllRecordsTable from './AllRecordsTable';
import './AllRecords.css';

class AllRecords extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ALL_RECORDS'});
    }

    render() {
        return (
            <div>
                <h2>All Records:</h2>
                {this.props.data[0] &&
                <AllRecordsTable data={this.props.data} search={this.props.search || ""} />
                }
            </div>
        )
    }
}

const mapRedux = redux => {
    return {
        search : redux.searchTermReducer,
        data : redux.allRecordsReducer
    }
}

export default connect(mapRedux)(AllRecords);