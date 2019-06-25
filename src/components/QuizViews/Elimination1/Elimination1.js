import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'


export class Elimination1 extends Component {

    state = {
        round1: [],
        time: '',
        statusBar: 5
    }

    handleNext = () => {
        this.props.dispatch({ type: 'SET_NEW_VALUES', payload: this.state})
        this.props.history.push('/ElimInstructions2')
    }

    handleSelect = (event) => {
        console.log('value is:', event.target.value)
        // for(let i=0; i<this.props.values.length; i++) {
        //     console.log('value is:', event.target.value)

        //     console.log('now checking value', this.props.values[i].values)
        //     if(event.target.value === this.props.values[i].values) {
        //         this.state.round1.splice(i, 1)
        //         return;
        //     }
        // } 
        // this.setState({
        //     round1: [...this.state.round1, event.target.value]
        // })
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_VALUES'});
    }

    render() {
        console.log(this.state.round1)
        return (
            <div>
                <StatusBar status={this.state.statusBar} />
                <div>
                    <ul>
                        {this.props.values.map(value => {
                            return <li  onClick={this.handleSelect} value={value.id}>{value.values}</li>
                        })}
                    </ul>
                </div>
                {/* <Link to="/ElimInstructions2"> link </Link> */}
                <div>
                    <Button onClick={this.handleNext}>Next</Button>
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
