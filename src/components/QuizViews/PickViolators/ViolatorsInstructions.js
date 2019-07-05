import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import { connect } from 'react-redux';
import Banner from '../Banner/Banner';
import './ViolatorsInstructions.css'

class ViolatorsInstructions extends Component {

    state = {
        statusBar : 68
    }

    componentDidMount(){
        console.log(this.props.reduxState.newValuesReducer.orderCore);
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <div className="instructions">
                On the next screen you will see your 5 core values along with a list of the values you identified as less important to you. 
                Select the 5 values that are most likely to cause you to violate any of your core values.
                </div>

                <div className="giph" >

                </div>


                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/PickViolators')}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(ViolatorsInstructions);
