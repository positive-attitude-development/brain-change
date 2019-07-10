import React, { Component } from 'react' 
import {  Button, Paper, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import './Elimination3.css'

class Elimination3 extends Component {

    state = {
        round3: [],
        statusBar: 30
    }

    // Fetch all value words
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});

        // setting current time to state
        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })
    }

    // Send 5 selected values to reducer and route to EliminationInstruc4 page. 
    // Will send alert if 5 values are not selected
    handleNext = () => {

            //capturing ending time, subtracting current time
            let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let totalTime3 = nextTime - this.state.time 

            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'round3', payload: this.state.round3});
            this.props.dispatch({type: 'SET_NEW_TIME', name: 'round3Time', payload: totalTime3 });
            this.props.history.push('/ElimInstructions4')
    }

    // Select and deselect by clicking values and store into local state round3
    handleSelect = (event) => {
        for(let i = 0; i < this.state.round3.length; i++) {
            if(event.target.value === this.state.round3[i]) {
                this.setState({
                    round3: this.state.round3.filter((_,j) => j !== i)
                })
                return;
            }
        }
        if(this.state.round3.length === 5) {
            return;
        }
        this.setState({
            round3: [...this.state.round3, event.target.value]
        })
    }
    
    render() {
        // Creating array of all the values minus the previous selected values
        let reducer = this.props.newValues;
        let round1 = reducer.round1;
        let round2 = reducer.round2;
        let twoArrays = round1.concat(round2);
        let newArray = this.props.values.filter((value) => {
            for(let newValue of twoArrays) {
                if(newValue === value.id) {
                    return false;
                }
            }
            return true;
        })
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <div className="paperContainer">
                    <h2 className="inst"> Remove the 5 least important values</h2>
                    <Paper className="paper3">
                        <div className="valuesList">
                            <ul className="elim3List">
                                {newArray.map(value => {
                                    return <li key={value.id} onClick={this.handleSelect} className={this.state.round3.includes(value.id) ? "striked" : "unStriked"} value={value.id}>{value.values}</li>
                                })}
                            </ul>
                        </div>
                        <div className="nextBtn1">
                            <Button
                                disabled={this.state.round3.length !== 5}
                                color="primary"
                                variant="contained"
                                onClick={this.handleNext}
                                >
                                Next
                            </Button> 
                        </div>
                        <p className="valueCount">{this.state.round3.length} / 5 values selected</p>
                    </Paper>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        newValues: reduxState.newValuesReducer
    }
}

export default connect(mapStateToProps)(Elimination3);
