import React, { Component } from 'react'
<<<<<<< HEAD
import { Link } from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
=======
import { Grid, Button, Paper } from '@material-ui/core';
>>>>>>> 7b1f7d1fd4f0166fe7cbf0567518aaaed9bfe52f
import StatusBar from '../StatusBar'; 
import './EliminationInstructions1.css';
import Banner from '../Banner/Banner';


<<<<<<< HEAD
export class EliminationInstructions1 extends Component {
=======
class EliminationInstructions1 extends Component {



>>>>>>> 7b1f7d1fd4f0166fe7cbf0567518aaaed9bfe52f

    state = {
        statusBar : 1
    }
    render() {
        return (
            <div>
<<<<<<< HEAD
                <StatusBar status={this.state.statusBar} />
                <div className="textInst">
                
                On the next screen there will be a list of values. 
                Remove the 9 values that are the least important to you.
                
                 </div>

                 <div className="giph">

=======
                <div className="banner">
                    <Banner />
>>>>>>> 7b1f7d1fd4f0166fe7cbf0567518aaaed9bfe52f
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <Paper>
                <div className="instructionView1">
                        <h3 className="textInst">
                            On the next screen there will be a list of values. Remove the 9 values that are the least important to you.
                        </h3>
                
<<<<<<< HEAD
            <Link to="/Elim1"> 
                <Button
                    color="primary"
                    variant="contained"
                    >
                    Next
                </Button> 
            </Link>
=======

                    <div className="giph">

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
                </Paper>
>>>>>>> 7b1f7d1fd4f0166fe7cbf0567518aaaed9bfe52f
            </div>
        )
    }
}

export default EliminationInstructions1
