import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Elimination1.css';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';


export class Elimination1 extends Component {

    state = {
        round1: [],
        time: '',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_VALUES' });
    }

    handleNext = () => {
        this.props.dispatch({ type: 'SET_NEW_VALUES', payload: this.state})
        this.props.history.push('/ElimInstructions2')
    }

    handleSelect = (event) => {
        // console.log('value is:', event.target.value)
        for(let i=0; i<this.state.round1.length; i++) {
            if(event.target.value === this.state.round1[i]) {
                this.state.round1.splice(i, 1)
                return;
            } 
        } 
        if (this.state.round1.length === 9) {
            return;
        }
        this.setState({
            round1: [...this.state.round1, event.target.value]
        })
    }


    render() {
        console.log('checking array',this.state.round1)
        return (
            <div>
                <div>
                    <ul>
                        {this.props.values.map(value => {
                            return <li key={value.id} onClick={this.handleSelect} className="lineItem" value={value.id}>{value.values}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <button onClick={this.handleNext}>Next</button>
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
