import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions2.css'

class EliminationInstructions2 extends Component {
    state = {
        statusBar : 9
    }

    render() {
        return (
            <div>
                 <StatusBar status={this.state.statusBar} />

                <div className="instructions">
                On the next screen you will see the updated list of values. 
                Remove another 9 values that are the least important to you. 
                </div>
                
                <div className="giph">

                </div>

                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Elim2')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

export default EliminationInstructions2
