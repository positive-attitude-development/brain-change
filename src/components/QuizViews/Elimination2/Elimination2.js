import React, { Component } from 'react'
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import { Paper, Grid } from '@material-ui/core';
import './Elimination2.css';

class Elimination2 extends Component {

    state = {
        round2: [],
        statusBar : 13
    }

    // Fetch all value words
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});
        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })
        console.log(this.state)
    }

    // Send 9 selected values to reducer and route to beliefinstruct1 page, will alert if 
    // 9 values has not been selected
    handleNext = () => {
        if (this.state.round2.length === 9) {
            let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let totalTime2 = nextTime - this.state.time 

            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'round2', payload: this.state.round2});
            this.props.dispatch({type: 'SET_NEW_TIME', name: 'round2Time', payload: totalTime2 });
            this.props.history.push('/BeliefInstruct1')
        } else {
            return alert('Please select 9 values that are least important to you.')
        }
    }


    // Select and deselect value words and store into local state round2
    handleSelect = (event) => {
        for (let i = 0; i < this.state.round2.length; i++) {
            if (event.target.value === this.state.round2[i]) {
                this.setState({
                    round2: this.state.round2.filter((_, j) => j !== i)
                })
                return;
            }
        }
        if (this.state.round2.length === 9) {
            return;
        }
        this.setState({
            round2: [...this.state.round2, event.target.value],
        })
    }

    
    render() {        
        let newArray = this.props.values.filter((value) => {
            let result = true;

            for(let newValue of this.props.newValues.round1) {
                if(newValue === value.id) {
                    result = false;
                }
            }
            return result;
        })

        return (
            <div>
                <StatusBar status={this.state.statusBar} />

                <Paper className="paper">
                    <div className="valuesList">
                        <h2 className="inst">Remove the 9 least important values</h2>
                        <ul className="elim2List">
                            {newArray.map(value => {
                                    return <li key={value.id} onClick={this.handleSelect} className={this.state.round2.includes(value.id) ? "striked" : "unStriked"} value={value.id}>{value.values}</li>

                            })}
                        </ul>
                    </div>
                <Grid container justify="center">
                  <div className="button">
                    <Button  
                        color="primary"
                        variant="contained"
                        onClick={this.handleNext}
                        >
                        Next
                    </Button> 
                  </div>
                </Grid>
              </Paper>
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
export default connect(mapStateToProps)(Elimination2);

