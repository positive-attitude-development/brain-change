import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 

export class PickViolators extends Component {

    state = {
        statusBar : 73,
        violators : ''
    }


    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});
    }


    handleNext = () => {
        if(this.state.violators === 5) {
            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'violators', payload: this.state.violators});
            this.props.history.push('/ElimInstructions3')
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
    }

    render() {
        
       

        return (
            <div>
                {JSON.stringify(this.props.newValues)}
                <StatusBar status={this.state.statusBar} />

{/* 
                <ul className="elim1List">
                            {this.props.coreValues.map(value => {
                                return <li key={value.id} </li>
                            })}
                </ul>
 */}

                <Link to="/OrderViolatorsInstructions">    
                    <Button
                        onClick={this.handleNext}
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        coreValues: reduxState.newValuesReducer.coreValues
    }
}
export default connect(mapStateToProps)(PickViolators);

