import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 


import './RankInstructions.css'

class RankInstructions extends Component {

    state = {
        statusBar : 90,
        corePercent: 0,
        violatorPercent: 0
    }


    handleChange = (event) => {
        event.preventDefault(); 



    } 

    render() {
        return (
            <div>
                <StatusBar status={this.state.statusBar} />
                <div className="instructions">
                On the next screen estimate the percentage of your daily life that you are directed by your core values 
                    and the percentage that you are directed by your violators. 
                </div>
                

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
