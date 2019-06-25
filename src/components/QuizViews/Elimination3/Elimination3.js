import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 

import './Elimination3.css'

export class Elimination3 extends Component {
    state = {
        statusBar: 30
    }
    
    render() {
        return (
            <div>
                 <StatusBar status={this.state.statusBar} />

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

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}
export default connect(mapStateToProps)(Elimination3);
