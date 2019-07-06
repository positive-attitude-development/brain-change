import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
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
            <Paper contained className="paper">             
                
                <div className ="instructions">
                    <Typography>
                On the next screen please write 3 of your beliefs that you would not want to give up. 
                Beliefs can be personal, political, or religious. Here is a short tutorial. 
                    </Typography>
                  <div className = "space"> 

                  </div>
                    <Typography>
                (Examples for tutorial: 
                I believe people can change for the better. 
                I believe taxes should be lowered. I believe in a higher power.)
                    </Typography>
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
