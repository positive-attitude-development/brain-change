import React, { Component } from 'react'

import { Grid, Button, Paper } from '@material-ui/core';
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
                <StatusBar status={this.state.statusBar} />
                <div className="instructions">
                
                On the next screen there will be a list of values. 
                Remove the 9 values that are the least important to you.
                
                 </div>

                 <div className="giph">

                </div>
                
                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Elim1')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </Paper>
        )
    }
}

export default EliminationInstructions1
