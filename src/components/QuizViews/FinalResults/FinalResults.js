import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';

import StatusBar from '../StatusBar'; 

export class FinalResults extends Component {

    state = {
        statusBar : 100
    }
    render() {
        return (
            <div>
                <StatusBar status={this.state.statusBar} />

                FINISHED !!
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}
export default connect(mapStateToProps)(FinalResults);

