import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
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
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>                 
                <div className ="instructions">
                    <div>
                On the next screen please write 3 of your beliefs that you would not want to give up. 
                Beliefs can be personal, political, or religious. Here is a short tutorial. 
                    </div> <div>
                (Examples for tutorial: 
                I believe people can change for the better. 
                I believe taxes should be lowered. I believe in a higher power.)
                    </div>
                 </div>
                 
                 <div className="examples">
                  (Examples for tutorial: I believe people can change for the better. 
                I believe taxes should be lowered. I believe in a higher power.)
                </div>
                
                <div className="giph">

                </div>

                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Belief1')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

export default BeliefInstructions1
