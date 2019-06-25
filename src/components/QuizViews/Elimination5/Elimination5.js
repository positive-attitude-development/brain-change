import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

export class Elimination5 extends Component {
    render() {
        return (
            <div>
                

                <Link to="/OrderValuesInstructions"> 
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

export default Elimination5
