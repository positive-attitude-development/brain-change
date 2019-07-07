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
            <Paper contained className="paper">             
                
                <div className ="instructions">
                    <Typography variant="h5">
                        On the next screen please write 3 of your beliefs that you would not want to give up. 
                        <div>Beliefs can be personal, political, or religious.</div>
                        <div className = "space"> </div>
                    </Typography>
                </div>
{/*             
                <div> Here is a short tutorial </div>
                    </Typography> */}

                  {/* <Typography variant="h5">
                Examples Being: 
                <div>I believe people can change for the better. </div>
                <div>I believe taxes should be lowered. </div>
                <div>I believe in a higher power.</div>
                    </Typography> */}
                {/* </div> */}
              
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
