import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 

export class PickViolators extends Component {

    state = {
        statusBar : 73
    }

    render() {
        return (
            <div>
                
                <StatusBar status={this.state.statusBar} />

                <Link to="/OrderViolatorsInstructions">    
                    <Button
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
                </Link>
            </div>
        )
    }
}

export default PickViolators
