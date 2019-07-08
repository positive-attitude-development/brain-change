import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import { connect } from 'react-redux';
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

                <Paper justify="center"  className="paper">
                    <div className = "instructions">
                        <Typography variant="h5">
                            On the next screen you will see your 5 core values. 
                            Rank your 5 core values from most important to least important.
                        </Typography>
                    </div>
                
                <div className="giph">
                        <iframe src="https://giphy.com/embed/QAhRaZjXZeAHj65DiN" frameBorder="0" class="giphy-embed" ></iframe>
                </div>

               
                  <div className="button">
                    <Button  
                        justify="right"
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/OrderValues')}
                        >
                        Next
                    </Button> 
                  </div>
               </Paper>
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
