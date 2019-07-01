import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './BeliefInstructions2.css'

class BeliefInstructions2 extends Component {

    state = {
        statusBar : 42
    }

    render() {
        return (
            <div>
                 <StatusBar status={this.state.statusBar} />
                 
                <div className = "instructions">
                    Choose the belief that causes the most internal or external conflict in your life 
                    and categorize it as personal, religious, or political
                </div>


                <div className="giph">
                     

                </div>

                <Link to="/Belief2">   
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

export default BeliefInstructions2

