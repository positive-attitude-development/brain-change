import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import SnapShot from './SnapShot'; 
import StatusBar from '../StatusBar';

class FinalResults extends Component {

    state = {
        statusBar : 100,
    }

    render() {
        return (
            <div>

                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>

                <h3 align="center">Final Result</h3>

                {this.props.snapshot[0] && <SnapShot /> }

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        snapshot: reduxState.snapshotReducer
    }
}

export default connect(mapStateToProps)(FinalResults);

