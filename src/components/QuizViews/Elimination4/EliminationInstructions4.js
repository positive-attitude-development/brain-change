import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

import './EliminationInstructions4.css'

export class EliminationInstructions4 extends Component {
    render() {
        return (
            <div>

                <div className="instructions">
                    On the next screen you will see the updated list of values. 
                    Remove 5 more values that are the least important to you.
                </div>

                <div className="giph">

                </div>
                
                    <Link to="/Elim4">    
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

export default EliminationInstructions4
