import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
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

                <Paper className="paper">    
                    <div className="instructions">
                        <Typography variant="h5">
                            On the next screen estimate the percentage of your daily life that you are directed by your core values 
                            and the percentage that you are directed by your violators. 
                        </Typography>
                    </div>
                    <div className="giph">
                        <iframe src="https://giphy.com/embed/lryXRzlarUKQQ6U6iE" frameBorder="0" class="giphy-embed"></iframe>
                    </div>
                    <div className="button">
                        <Button  
                            color="primary"
                            variant="contained"
                            onClick={() => this.props.history.push('/RankPercents')}
                            >
                            Next
                        </Button> 
                    </div>
                </Paper>    
            </div>
        )
    }
}

export default RankInstructions
