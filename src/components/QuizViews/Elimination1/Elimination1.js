import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Elimination1.css';
import { Paper, Button, Grid } from '@material-ui/core';
import StatusBar from '../StatusBar';

class Elimination1 extends Component {

    state = {
        round1: [],
        statusBar: 5,
        time: 0
    }

    // Fetch all the value words
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_VALUES' });
        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })
    }

    // Send 9 selected values to reducer and route to Eliminationinstruction2 page
    handleNext = () => {
            let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let totalTime1 = nextTime - this.state.time 
           
            this.props.dispatch({ type: 'SET_NEW_VALUES', name: 'round1', payload: this.state.round1})
            this.props.dispatch({ type: 'SET_NEW_TIME', name: 'round1Time', payload: totalTime1})
            this.props.history.push('/ElimInstructions2')        
    }

    // Select and deselect value words and store in local state round 1
    handleSelect = (event) => {
        for(let i=0; i<this.state.round1.length; i++) {
            if(event.target.value === this.state.round1[i]) {
                this.setState({
                    round1: this.state.round1.filter((_, j) => j !== i)
                })
                return;
            } 
        } 
        if (this.state.round1.length === 9) {
            return;
        }
        this.setState({
            round1: [...this.state.round1, event.target.value],
        })
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <div className="paperContainer">
                    <h2 className="inst" > Remove the 9 least important values</h2>
                    <Paper className="paper">
                        <div className="valuesList">
                            <ul className="elim1List">
                                {this.props.values.map(value => {
                                    return <li key={value.id} onClick={this.handleSelect} className={this.state.round1.includes(value.id) ? "striked" : "unStriked"} value={value.id}>{value.values}</li>
                                })}
                            </ul>
                        </div>
                        <div className="nextBtn1">
                            <Button
                                disabled={this.state.round1.length !== 9}
                                color="primary"
                                variant="contained"
                                onClick={this.handleNext}>
                                Next
                            </Button>
                        </div>
                        <p className="valueCount">{this.state.round1.length} / 9 values selected</p>
                    </Paper>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer
    }
}

export default connect(mapStateToProps)(Elimination1);
