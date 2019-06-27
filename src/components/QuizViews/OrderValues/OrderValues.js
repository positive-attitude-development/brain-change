import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import DragDrop from '../OrderValues/DragDrop';

export class OrderValues1 extends Component {

    state = {
        statusBar : 64
    }

    render() {
        return (
            <div>
                
                <StatusBar status={this.state.statusBar} />
                <DragDrop />
                <Link to="/ViolatorsInstructions">    
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
export default connect(mapStateToProps)(OrderValues1);

