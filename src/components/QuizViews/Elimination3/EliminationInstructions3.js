import React, { Component } from 'react'
import {  Grid, Button, Paper } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
import './EliminationInstructions3.css'

class EliminationInstructions3 extends Component {

    state = {
        statusBar: 25
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
            <Paper>
                <div className="instructions">
                On the next screen you will see the updated list of values. 
                This time, remove 5 values that are the least important to you.  
                </div>
                
                <div className="giph">

                </div>
            </Paper>
              </Grid>
                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Elim3')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
       
            </div>
        )
    }
}

export default EliminationInstructions3
