import React, { Component } from 'react'
import { Link } from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions1.css'

export class EliminationInstructions1 extends Component {

    state = {
        statusBar : 1
    }
    render() {
        return (
            <div>
                <StatusBar status={this.state.statusBar} />
                <div className="textInst">
                
                On the next screen there will be a list of values. 
                Remove the 9 values that are the least important to you.
                
                 </div>

                 <div className="giph">

                </div>
                
            <Link to="/Elim1"> 
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

export default EliminationInstructions1
