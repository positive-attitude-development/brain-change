import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './ViolatorsInstructions.css'

export class ViolatorsInstructions extends Component {

    state = {
        statusBar : 68
    }

    render() {
        return (
            <div>

                 <StatusBar status={this.state.statusBar} />

                <div className="instructions">
                
                </div>

                <div className="giph" >

                </div>

                <Link to="/PickViolators">   
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

export default ViolatorsInstructions
