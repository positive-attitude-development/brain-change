import React, { Component } from 'react'
import { Grid, Button, Paper } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import './EliminationInstructions1.css';
import Banner from '../Banner/Banner';


class EliminationInstructions1 extends Component {




    state = {
        statusBar : 1
    }
    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>

                <div className="instructionView1">
                <Paper container>
                        <div className="textInst">
                            On the next screen there will be a list of values. 
                            Remove the 9 values that are the least important to you.
                        </div>
                </Paper>
                    <div className="giph">
                    </div>

                </div>
                        <div className="button">
                            <Button  
                                color="primary"
                                variant="contained"
                                onClick={() => this.props.history.push('/Elim1')}
                                >
                                Next
                            </Button> 
                        </div>
            </div>
        )
    }
}

export default EliminationInstructions1
