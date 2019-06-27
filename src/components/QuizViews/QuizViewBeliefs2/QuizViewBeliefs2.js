import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {  Button } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Paper} from"@material-ui/core";
import StatusBar from '../StatusBar'; 
import QuizViewSelect from './QuizViewSelect'

import './QuizViewBeliefs2.css'

export class QuizViewBeliefs2 extends Component {

componentDidMount() {
    this.props.dispatch({ type: 'FETCH_VALUES'})
    console.log("log")
}


    state = {
            statusBar : 47,
            testedBelief : "",
            typeOfBelief : ""
        }


    handleRadio = (event) => {
        event.preventDefault(); 
        this.setState({
            testedBelief: event.target.value
        })
        console.log(this.state)
    }
 
    handleClick = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: "SET_NEW_VALUES" , name:'testedBelief', payload: this.state });
        this.props.history.push('/ElimInstructions5')

    }

    render() {
        
        return (
            <div>
                
                 <StatusBar status={this.state.statusBar} />

                <div>
                    <Paper>
                    <FormControl component="fieldset"
                    //  className={classes.formControl}
                    >

                        <FormLabel component="legend">Beliefs</FormLabel>
                            <RadioGroup
                            aria-label="Beliefs"
                            name="Beliefs"
                            // className=
                            // value=
                            onChange={this.handleRadio}
                            >

                            
                            <FormControlLabel  value="belief1" control={<Radio />} label="" />{this.props.beliefs.belief1}
                            <FormControlLabel  value="belief2" control={<Radio />} label="" />{this.props.beliefs.belief2}
                            <FormControlLabel value="belief3" control={<Radio />} label="" />{this.props.beliefs.belief3}
                            
                            </RadioGroup>
                    </FormControl>
                    </Paper>
                    <QuizViewSelect />
                </div>

                <div>
                        <Button
                            onClick={this.handleClick}
                            color="primary"
                            variant="contained"
                            >
                            Next
                        </Button> 
                </div>
            </div>
        )
    }
}


const mapState = reduxState => {
    return {
        reduxState,
        beliefs : reduxState.newValuesReducer.beliefs
        }   
    }
    export default connect(mapState)(QuizViewBeliefs2)
