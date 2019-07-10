import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
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

                <Paper className="paper">
                    <div className="instructions">
                        <Typography variant="h5">
                            On the next screen you will see your 5 core value violators. 
                            Rank your 5 violators from the one that causes the most conflict
                            in your life to the one that causes the least. 
                        </Typography>
                    </div>

                    <div className="giph">
                        <iframe src="https://giphy.com/embed/MDga3TwBlXkFIAuEN2" frameBorder="0" class="giphy-embed"></iframe>
                    </div>
  
                    <div className = "button">
                        <Button  
                            color="primary"
                            variant="contained"
                            onClick={() => this.props.history.push('/OrderViolators')}
                            >
                            Next
                        </Button> 
                    </div>
                </Paper>
            </div>
        )
    }
}

export default OrderViolatorsInstructions
