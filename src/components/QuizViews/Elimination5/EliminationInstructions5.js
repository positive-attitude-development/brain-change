import React, { Component } from 'react'
import { Paper, Typography, Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import '../EliminationInstructions.css'


class EliminationInstructions5 extends Component {

    state = {
        statusBar : 51
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
                            On the next screen you will see a list of the 10 remaining values. 
                            Remove 5 values that are less important to you.
                         </Typography>
                    </div>

                    <div className="giph">
                        <iframe src="https://giphy.com/embed/MCFM4xcrVFYG4hQcmV" width="600" height="400" frameBorder="0" disabled="block" class="giphy-embed" allowFullScreen title="elimination5Instructions"></iframe>
                    </div>

                    <div className="button">
                        <Button  
                            justify="right"
                            color="primary"
                            variant="contained"
                            onClick={() => this.props.history.push('/Elim5')}
                            >
                            Next
                        </Button> 
                    </div>
                </Paper>
            </div>
        )
    }
}

export default EliminationInstructions5
