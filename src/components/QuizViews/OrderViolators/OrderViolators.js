import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

export class OrderViolaters1 extends Component {
    render() {
        return (
            <div>
                
                <Link to="/RankInstructions">    
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

export default OrderViolaters1
