import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

import './RankInstructions.css'

export class RankInstructions extends Component {
    render() {
        return (
            <div>
                

                <Link to="/RankPercents">    
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

export default RankInstructions
