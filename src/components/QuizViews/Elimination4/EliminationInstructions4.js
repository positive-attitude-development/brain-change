import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './EliminationInstructions4.css'

export class EliminationInstructions4 extends Component {

    state = {
        statusBar : 34
    }

    render() {
        return (
            <div>
                 <StatusBar status={this.state.statusBar} />

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
