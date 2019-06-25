import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

export class OrderViolatersInstructions extends Component {
    render() {
        return (
            <div>
                

                <Link to="/OrderViolators">    
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

export default OrderViolatersInstructions
