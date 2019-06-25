import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './RankInstructions.css'

export class RankInstructions extends Component {

    state = {
        statusBar : 90
    }

    render() {
        return (
            <div>
                
                <StatusBar status={this.state.statusBar} />

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
