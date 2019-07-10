import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent} from '@material-ui/core';
import AllRecordsTable from './AllRecordsTable';
import './AllRecords.css';

class AllRecords extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ALL_RECORDS'});
    }

    render() {
        return (
            <Card raised className="card">
                <CardContent>
                    <h3>All Participants:</h3>
                    {/* render all participants table if information is in reducer */}
                    {this.props.allRecords[0] &&
                        <AllRecordsTable history={this.props.history} />
                    }
                </CardContent>
            </Card>
        )
    }
}

const mapRedux = redux => {
    return { allRecords : redux.allRecordsReducer }
}

export default connect(mapRedux)(AllRecords);