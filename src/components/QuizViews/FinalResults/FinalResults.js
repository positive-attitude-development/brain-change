import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import Banner from '../Banner/Banner';
import SnapShot from './SnapShot'; 
import StatusBar from '../StatusBar'; 

class FinalResults extends Component {

    state = {
        statusBar : 100,
    }

    componentDidMount() {

    }

    handleSubmit = () => {
        //this.props.dispatch({type: 'ADD_RESULTS', payload: this.state.results })
    }

    render() {
        return (
            <div>
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>

                <SnapShot Values = {this.props.reduxState} /> 
                
  
                FINISHED !!
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleSubmit}
                    >
                    Submit
                </Button>
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

