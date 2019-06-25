import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

export class Elimination3 extends Component {
    render() {
        return (
            <div>
                

                <Link to="/ElimInstructions4"> 
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

export default Elimination3
