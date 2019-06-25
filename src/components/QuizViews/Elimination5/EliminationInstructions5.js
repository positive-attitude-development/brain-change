import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions5.css'

export class EliminationInstructions5 extends Component {

    state = {
        statusBar : 51
    }

    render() {
        return (
            <div>
                
                <StatusBar status={this.state.statusBar} />

                <div className="instructions">
                    On the next screen you will see a list of the 10 remaining values. 
                    Remove 5 values that are less important to you.
                </div>

                <div className="giph">

                </div>

                <Link to="/Elim5"> 
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

export default EliminationInstructions5
