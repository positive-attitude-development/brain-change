import React, { Component } from 'react'
import {  Grid, Button } from '@material-ui/core';
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
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <div className="instructions">
                On the next screen you will see the updated list of values. 
                This time, remove 5 values that are the least important to you.  
                </div>
                
                <div className="giph">

                </div>

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
