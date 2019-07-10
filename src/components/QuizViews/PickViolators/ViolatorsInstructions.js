import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import { connect } from 'react-redux';

class ViolatorsInstructions extends Component {

    state = {
        statusBar : 68
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
                            On the next screen you will see your 5 core values along with a list of the values you identified as less important to you. 
                            Select the 5 values that are most likely to cause you to violate any of your core values.
                        </Typography>
                    </div>

                    <div className="giph" >
                        <iframe src="https://giphy.com/embed/h45MFzDq40Kw2cnLig" frameBorder="0" className="giphy-embed" title="violatorsInstructions"></iframe>
                    </div>

                    <div className="button">
                        <Button  
                            color="primary"
                            variant="contained"
                            onClick={() => this.props.history.push('/PickViolators')}
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

export default connect(mapStateToProps)(ViolatorsInstructions);
