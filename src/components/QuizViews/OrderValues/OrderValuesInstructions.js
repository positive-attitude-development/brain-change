import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import { connect } from 'react-redux';
import Banner from '../Banner/Banner';
import './OrderValuesInstructions.css'

class OrderValuesInstructions extends Component {

    state = {
        statusBar : 59
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <div className = "instructions">
                    On the next screen you will see your 5 core values. 
                    Rank your 5 core values from most important to least important.
                </div>
                
                <div className="giph">

                </div>

                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/OrderValues')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(OrderValuesInstructions);
