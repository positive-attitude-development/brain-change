import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions5.css'

class EliminationInstructions5 extends Component {

    state = {
        statusBar : 51
    }

    render() {
        return (
            <div>
                
                <StatusBar status={this.state.statusBar} />

                <div className="instructions">
                    On the next screen you will see a list of the 10 remaining values. 
                    Remove 5 values that are less important to you.
                </div>

                <div className="giph">

                </div>

                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Elim5')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

export default EliminationInstructions5
