import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
import './OrderViolatorsInstructions.css'

class OrderViolatorsInstructions extends Component {

    state = {
        statusBar : 78
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <div className="instructions">
                On the next screen you will see your 5 core value violators. 
                Rank your 5 violators from the one that causes the most conflict
                in your life to the one that causes the least. 
                </div>

                <div className="giph">

                </div>
  
                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/OrderViolators')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

export default OrderViolatorsInstructions
