import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
import './BeliefInstructions2.css'

class BeliefInstructions2 extends Component {

    state = {
        statusBar : 42
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>           
            <Paper contained className="paper">        
                <div className = "instructions">
                    <Typography variant="h5">
                    Choose the belief that causes the most internal or external conflict in your life 
                    and categorize it as personal, religious, or political
                    </Typography>
                </div>


                <div className="giph"> </div>

                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Belief2')}
                        >
                        Next
                    </Button> 
                  </div>
               </Paper>
            </div>
        )
    }
}

export default BeliefInstructions2

