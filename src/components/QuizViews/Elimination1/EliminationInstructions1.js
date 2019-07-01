import React, { Component } from 'react'
import { Link } from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions1.css'

class EliminationInstructions1 extends Component {

    state = {
        statusBar : 1
    }
    render() {
        return (
            <div className="instructionView1">
                <StatusBar status={this.state.statusBar} />
                    <h3 className="textInst">
                        On the next screen there will be a list of values. Remove the 9 values that are the least important to you.
                    </h3>
              

                 <div className="giph">

                </div>
                
                <Link to="/Elim1"> 
                    <Button
                        color="primary"
                        variant="contained"
                        className="nextBtn1"
                        >
                        Next
                    </Button> 
                </Link>
            </div>
        )
    }
}

export default EliminationInstructions1
