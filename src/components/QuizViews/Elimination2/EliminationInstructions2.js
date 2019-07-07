import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import './EliminationInstructions2.css'

class EliminationInstructions2 extends Component {

    state = {
        statusBar : 9
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
               
                <Paper containter className ="paper">
                    <div className="instructions">
                    <Typography variant="h5">
                On the next screen you will see the updated list of values. 
                Remove another 9 values that are the least important to you. 
                    </Typography>
                    </div>
                
                <div className="giph">

                </div>

                  <div className="button">
                    <Button  
                        justify="right"
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Elim2')}
                        >
                        Next
                    </Button> 
                  </div>
              </Paper>
            </div>
        )
    }
}

export default EliminationInstructions2
