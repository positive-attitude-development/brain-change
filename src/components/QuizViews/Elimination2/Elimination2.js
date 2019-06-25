import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 

export class Elimination2 extends Component {

    state = {
        statusBar : 13
    }
    
    render() {
        return (
            <div>
                 <StatusBar status={this.state.statusBar} />

                <Link to="/BeliefInstruct1"> 
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
export default connect(mapStateToProps)(Elimination2);

