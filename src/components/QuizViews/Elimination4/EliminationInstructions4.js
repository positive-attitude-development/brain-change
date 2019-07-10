import React, { Component } from 'react'
import { Paper, Button, Grid, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import '../EliminationInstructions.css'


class EliminationInstructions4 extends Component {

    state = {
        statusBar : 34
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>

                <Paper justify="center"  className="paper">
                    <div className="instructions">
                    <Typography variant="h5">
                    On the next screen you will see the updated list of values. 
                    Remove 5 more values that are the least important to you.
                    </Typography> 
                    </div>
                    <div className="giph">
                        <iframe src="https://giphy.com/embed/JpZ0Uw8RjW2nVM5q2m" width="600" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </div>
                
                  <div className="button">
                    <Button  
                        justify="right"
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/Elim4')}
                        >
                        Next
                    </Button> 
                  </div>
                </Paper>
            </div>
        )
    }
}

export default EliminationInstructions4
