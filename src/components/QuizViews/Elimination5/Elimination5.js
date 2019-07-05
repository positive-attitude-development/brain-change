import React, { Component } from 'react'
import {  Button, Paper, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import './Elimination5.css';
import Banner from '../Banner/Banner';


class Elimination5 extends Component {

    state = {
        round5: [],
        statusBar : 55
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
    }

    // Send 5 selected values to reducer and route to OrderValuesInstructions page.
    // Will alert if 5 values are not selected.
    handleNext = () => {
            let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let totalTime5 = nextTime - this.state.time 

            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'round5', payload: this.state.round5});
            this.props.dispatch({type: 'SET_NEW_TIME', name: 'round5Time', payload: totalTime5 });
            this.props.history.push('/OrderValuesInstructions')
    }

    // Select and deselect values and store into local state round5
    handleSelect = (event) => {
        for(let i = 0; i < this.state.round5.length; i++) {
            if(event.target.value === this.state.round5[i]) {
                this.setState({
                    round5: this.state.round5.filter((_,j) => j !== i)
                })
                return;
            }
        }
        if(this.state.round5.length === 5) {
            return;
        }
        this.setState({
            round5: [...this.state.round5, event.target.value]
        })
    }

    handleClick = () => {
        this.setState({
            round5: [34, 35, 36, 37, 38]
        })
    }

    render() {
        // Creating an array of all values minus the previous selected values
        let reducer = this.props.newValues;
        let round1 = reducer.round1;
        let round2 = reducer.round2;
        let round3 = reducer.round3;
        let round4 = reducer.round4;
        let fourArrays = round1.concat(round2, round3, round4);
        let newArray = this.props.values.filter((value) => {
            for(let newValue of fourArrays) {
                if(newValue === value.id) {
                    return false;
                }
            }
            return true;
        })

        return (
            <div>
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                <Paper className="paper5">
                    <div className="valuesList">
                        <h2 className="inst" onClick={this.handleClick}>Remove the 5 least important values</h2>
                        <ul className="elim5List">
                            {newArray.map(value => {
                                return <li key={value.id} onClick={this.handleSelect} className={this.state.round5.includes(value.id) ? "striked" : "unStriked"} value={value.id}>{value.values}</li>
                            })}
                        </ul>
                    </div>
                    <div className="nextBtn1">
                        <Button
                            disabled={this.state.round5.length !== 5}
                            color="primary"
                            variant="contained"
                            onClick={this.handleNext}
                            >
                            Next
                        </Button>
                    </div> 
                    <p className="valueCount">{this.state.round5.length} / 5 values selected</p>
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
export default connect(mapStateToProps)(Elimination5);

