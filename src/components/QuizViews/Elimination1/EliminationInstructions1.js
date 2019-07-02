import React, { Component } from 'react'

import {Button, Paper } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions1.css'

class EliminationInstructions1 extends Component {


// handleNext() {
   
// }

    state = {
        statusBar : 1
    }
    render() {
        return (

            <Paper>

            <div className="instructionView1">

                <StatusBar status={this.state.statusBar} />
                    <h3 className="textInst">
                        On the next screen there will be a list of values. Remove the 9 values that are the least important to you.
                    </h3>
              

                 <div className="giph">

                </div>
                
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Elim1')}
                        >
                        Next
                    </Button> 
                  </div>
                </div>
            </Paper>

        )
    }
}

export default EliminationInstructions1
