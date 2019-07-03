import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
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
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>                 
                <div className = "instructions">
                    Choose the belief that causes the most internal or external conflict in your life 
                    and categorize it as personal, religious, or political
                </div>


                <div className="giph"> </div>

                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Belief2')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

export default BeliefInstructions2

