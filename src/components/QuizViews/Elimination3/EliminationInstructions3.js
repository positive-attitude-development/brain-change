import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

import './EliminationInstructions3.css'

export class EliminationInstructions3 extends Component {
    render() {
        return (
            <div>
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
