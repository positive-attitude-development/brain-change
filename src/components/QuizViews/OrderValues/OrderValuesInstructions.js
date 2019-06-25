import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

import './OrderValuesInstructions.css'

export class OrderValuesInstructions extends Component {
    render() {
        return (
            <div>
                <div className = "instructions">
                    On the next screen you will see your 5 core values. 
                    Rank your 5 core values from most important to least important.
                </div>
                
                <div className="giph">

                </div>

                <Link to="OrderValues">   
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

export default OrderValuesInstructions
