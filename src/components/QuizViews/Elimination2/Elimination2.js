import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import { Paper } from '@material-ui/core';
import './Elimination2.css';

export class Elimination2 extends Component {

    state = {
        round2: [],
        statusBar : 13
    }

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});
        console.log('In didmount',this.props.newValues.round1);

    }

    handleNext = () => {
        if (this.state.round2.length === 9) {

            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'round2', payload: this.state.round2});
            this.props.history.push('/ElimInstructions3')
        } else {
            return alert('Please select 9 values that are least important to you.')
        }
    }

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
        console.log('show round2:', this.state.round2);
        console.log('show newreducer', this.props.newValues.round1)
        
        let newArray = this.props.values.filter((value) => {
            let result = true;

            for(let newValue of this.props.newValues.round1) {
                console.log('in for loop', newValue);
                console.log('show value in loop', value.id);
                if(newValue === value.id) {
                    result = false;
                }
            }
            return result;
        })
        console.log('in new Array', newArray);


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
                    <div>
                        <Link to="/BeliefInstruct1"> 
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.handleNext}
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
export default connect(mapStateToProps)(Elimination2);

