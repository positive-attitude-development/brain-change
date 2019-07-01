import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions3.css'

class EliminationInstructions3 extends Component {

    state = {
        statusBar: 25
    }

    render() {
        return (
            <div>
                <StatusBar status={this.state.statusBar} />

                <div className="instructions">
                On the next screen you will see the updated list of values. 
                This time, remove 5 values that are the least important to you.  
                </div>
                
                <div className="giph">

                </div>

                <Link to="/Elim3"> 
                    <Button
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
                </Link>
            </div>
        )
    }
}

export default EliminationInstructions3
