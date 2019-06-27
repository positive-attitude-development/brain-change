import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 


import './Elimination3.css'

export class Elimination3 extends Component {

    state = {
        round3: [],
        statusBar: 30
    }

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});
    }

    handleNext = () => {
        if(this.state.round3 === 9) {
            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'round3', payload: this.state.round3});
        } else  {
            return alert('Please select 5 values that are least important to you.')
        }
    }

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
                <StatusBar status={this.state.statusBar} />
                <Paper>
                    <div className="valuesList">
                        <h2 className="inst">Remove the 5 least important values</h2>
                        <ul className="elim3List">
                            {newArray.map(value => {
                                return <li key={value.id} onClick={this.handleSelect} className={this.state.round3.includes(value.id) ? "striked" : "unStriked"} value={value.id}>{value.values}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <Link to="/ElimInstructions4"> 
                            <Button
                                color="primary"
                                variant="contained"
                                >
                                Next
                            </Button> 
                        </Link>
                    </div>
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

export default connect(mapStateToProps)(Elimination3);
