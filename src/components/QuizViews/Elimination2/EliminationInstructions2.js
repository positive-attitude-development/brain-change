import React, { Component } from 'react'
import {  Button, Grid, Paper } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
import './EliminationInstructions2.css'

class EliminationInstructions2 extends Component {
    state = {
        statusBar : 9
    }

    render() {
        return (
            <div>
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <div className="instructions">
                    <Paper containter justify="center">
                        <h3 className="textInst" >
                On the next screen you will see the updated list of values. 
                Remove another 9 values that are the least important to you. 
                        </h3>
                    </Paper>
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
            </div>
        )
    }
}

export default EliminationInstructions2
