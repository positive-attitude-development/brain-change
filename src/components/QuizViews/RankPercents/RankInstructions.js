import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
import './RankInstructions.css'

class RankInstructions extends Component {

    state = {
        statusBar : 90,
        corePercent: 0,
        violatorPercent: 0
    }


    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>               
                 <div className="instructions">
                    On the next screen estimate the percentage of your daily life that you are directed by your core values 
                    and the percentage that you are directed by your violators. 
                </div>
                
                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/RankPercents')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

export default RankInstructions
