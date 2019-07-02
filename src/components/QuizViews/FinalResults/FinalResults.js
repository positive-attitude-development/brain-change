import React, { Component } from 'react'
// import { Link} from 'react-router-dom'; 
// import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';

import SnapShot from './SnapShot'; 
import StatusBar from '../StatusBar'; 

// import {thisExpression} from '@babel/types';



class FinalResults extends Component {

    state: {


    }

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});

    }


    state = {
        statusBar : 100
    }
    render() {
        return (
            <div>
                <StatusBar status={this.state.statusBar} />

                <SnapShot Values = {this.props.reduxState} /> 
                FINISHED !!
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        core : reduxState.newValuesReducer.core,
        violators :reduxState.newValuesReducer.violators,
        corePercents : reduxState.newValuesReducer.percents.valuesPercent,
        violatorPercents : reduxState.newValuesReducer.percents.violatorPercent,
        beliefs : reduxState.newValuesReducer.beliefs

    }
}
export default connect(mapStateToProps)(FinalResults);

