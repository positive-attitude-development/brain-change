import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

export class OrderValuesInstructions extends Component {
    render() {
        return (
            <div>
                

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
