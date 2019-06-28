import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Elimination1.css';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'



class Elimination1 extends Component {

    state = {
        round1: [],
        time: '',
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
        console.log(this.state)
    }

    // Send 9 selected values to reducer and route to Eliminationinstruction2 page
    handleNext = () => {
        if(this.state.round1.length === 9) {
            let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let totalTime1 = nextTime - this.state.time 
           

            console.log(this.state.time)
            this.props.dispatch({ type: 'SET_NEW_VALUES', name: 'round1', payload: this.state.round1})
            this.props.dispatch({ type: 'SET_NEW_TIME', name: 'round1Time', payload: totalTime1})
            this.props.history.push('/ElimInstructions2')
        } else {
            
            return alert('Please select 9 values that are least important to you')
        }
        
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
        console.log(this.state.time)
        return (
            <div>
                <div>
                    <StatusBar status={this.state.statusBar} />
                </div>
                <Paper className="paper">
                    <div className="valuesList">
                        <h2 className="inst">Remove the 9 least important values</h2>
                        <ul className="elim1List">
                            {this.props.values.map(value => {
                                return <li key={value.id} onClick={this.handleSelect} className={this.state.round1.includes(value.id) ? "striked" : "unStriked"} value={value.id}>{value.values}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <button onClick={this.handleNext}>Next</button>
                    </div>
                </Paper>
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
