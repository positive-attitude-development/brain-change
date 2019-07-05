import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import SnapShot from './SnapShot'; 
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner'


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

                <SnapShot Values = {this.props.reduxState} /> 
                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        newValues: reduxState.newValuesReducer,
        url: reduxState.urlReducer,

    }
}

export default connect(mapStateToProps)(FinalResults);

