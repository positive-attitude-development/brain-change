import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';

import './RankPercents.css'

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

const mapState = reduxState => {
    return {
        reduxState
        }   
    }
export default connect(mapState)(RankPercents)

