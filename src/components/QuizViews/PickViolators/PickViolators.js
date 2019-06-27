import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 

import './PickViolators'

export class PickViolators extends Component {

    state = {
        statusBar : 73,
        violators : []
    }


    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});

    }


    handleNext = () => {
        if(this.state.violators ) {
            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'violators', payload: this.state.violators});
            this.props.history.push("/OrderViolatorsInstructions")
        } else  {
            return alert('Please select 5 values that are least important to you.')
        }
    }

    handleSelect = (event) => {
        for(let i = 0; i < this.state.violators.length; i++) {
            if(event.target.value === this.state.violators[i]) {
                this.setState({
                    violators: this.state.violators.filter((_,j) => j !== i)
                })
                return;
            }
        }
        if(this.state.violators.length === 5) {
            return;
        }
        this.setState({
            violators: [...this.state.violators, event.target.value]
        })
        console.log(this.state.violators)
    }

    render() {
        let coreValues = this.props.coreValues
        let newArray = this.props.values.filter((value) => {
            for(let newValue of coreValues) {
                if(newValue === value.id) {
                    return false;
                }
            }
            return true;
        })

        
        return (
            <div>
                
                <StatusBar status={this.state.statusBar} />
               
            <div className="violators">
                <ul>
                    {newArray.map(value => {
                        return <li key={value.id} 
                                    onClick={this.handleSelect} 
                                    className={this.state.violators.includes(value.id) ? "striked" : "unStriked"} 
                                    value={value.id}>{value.values}</li>
                    })}
                </ul>
            </div>
                    <Button
                        onClick={this.handleNext}
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        coreValues: reduxState.newValuesReducer.orderCore
    }
}
export default connect(mapStateToProps)(PickViolators);

