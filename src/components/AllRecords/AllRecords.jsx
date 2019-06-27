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
                {this.props.allRecords[0] &&
                <AllRecordsTable history={this.props.history} />
                }
            </div>
        )
    }
}

const mapRedux = redux => {
    return { allRecords : redux.allRecordsReducer }
}

export default connect(mapRedux)(AllRecords);