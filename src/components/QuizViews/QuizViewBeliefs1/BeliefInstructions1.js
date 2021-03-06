import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import './BeliefInstructions1.css'

class BeliefInstructions1 extends Component {

    state = {
        statusBar : 17
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>   
            <Paper contained="true" className="paper">             
                <div className ="instructions">
                    <Typography variant="h5">
                        On the next screen please write 3 of your beliefs that you would not want to give up. 
                        <div>Beliefs can be personal, political, or religious.</div>
                    </Typography>
                </div>
                <div className="giph">
                    <iframe src="https://giphy.com/embed/LSpXEqPsZqJdBVgGSt" frameBorder="0" className="giphy-embed" title="belief1Instructions"></iframe> 
                </div>
                <div className="button">
                <Button  
                    color="primary"
                    variant="contained"
                    onClick={() => this.props.history.push('/Belief1')}
                    >
                    Next
                </Button> 
                </div>
            </Paper> 
        </div>
        )
    }
}

export default BeliefInstructions1
