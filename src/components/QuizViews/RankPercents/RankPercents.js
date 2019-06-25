import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

export class RankPercents extends Component {
    render() {
        return (
            <div>
                
                <Link to="FinalResults">   
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

export default RankPercents
