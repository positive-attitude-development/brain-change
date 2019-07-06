import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import SnapShot from './SnapShot'; 
import StatusBar from '../StatusBar';

class FinalResults extends Component {

    state = {
        statusBar : 100,
    }

    // componentDidMount() {
    //     this.props.dispatch({type: 'FETCH_SNAPSHOT', payload: this.props.id});
    // }

    render() {
        return (
            <div>

                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>

                <h3>Final Result</h3>

                {this.props.snapshot[0] && <SnapShot /> }

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        // id: reduxState.urlReducer.participant_id,
        snapshot: reduxState.snapshotReducer
    }
}

export default connect(mapStateToProps)(FinalResults);

