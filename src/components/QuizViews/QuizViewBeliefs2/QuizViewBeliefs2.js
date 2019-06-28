import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {withStyles} from '@material-ui/core/styles';

import { FormControl, FormControlLabel, FormLabel, 
        RadioGroup, Button, Radio, Paper, InputLabel, 
        MenuItem, Select} from"@material-ui/core";

import StatusBar from '../StatusBar'; 
import QuizViewSelect from './QuizViewSelect'


import './QuizViewBeliefs2.css'




const styles = {
    root : {
    
    button: {
        display: 'block',
        marginTop: '200px'
        },

    formControl: {
        margin: '200px',
        minWidth: '300px !important'
        }
   }

  };


export class QuizViewBeliefs2 extends Component {

    state = {
        statusBar : 47,
        testedBelief : "",
        typeOfBelief : ""
    }

componentDidMount() {
    this.props.dispatch({ type: 'FETCH_VALUES'})

    let now = new Date();
    let sec = now.getSeconds();
    let min = now.getMinutes();
    let hour = now.getHours(); 

    let totalTime =((min * 60 ) + (hour * 360) + sec)

    this.setState({
        time: totalTime
    })
}



    handleRadio = (event) => {
        event.preventDefault(); 
        this.setState({
            testedBelief: event.target.value
            })
            console.log(this.state)
        }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
                typeOfBelief: event.target.value
        })
        console.log(this.state);
    }

 
    handleClick = (event) => {
        event.preventDefault();

        let next = new Date(); 
        let sec = next.getSeconds();
        let min = next.getMinutes(); 
        let hour = next.getHours(); 

        let nextTime = ((min * 60 ) + (hour * 360) + sec)
        let belief2Time = nextTime - this.state.time 

        this.props.dispatch({ type: "SET_NEW_VALUES" , name:'testedBelief', payload: this.state });
        this.props.dispatch({type: 'SET_NEW_TIME', name: 'belief2Time', payload: belief2Time });

        this.props.history.push('/ElimInstructions5')
    }

    

    render() {
       const classes = this.props;
       console.log(this.state)
        return (
            <div className={classes.root}>
                
                 <StatusBar status={this.state.statusBar} />

                <div>
                    <Paper>
                        <FormControl component="fieldset"
                        className={classes.formControl}
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

                    <form autoComplete="off">
                        {/* <Button 
                        className={classes.button} onClick={handleOpen} 
                        />  */}
                        <FormControl className={classes.formControl}>
                            <InputLabel>Type of Belief</InputLabel>
                            <Select
                            // open={open}
                            // onClose={handleClose}
                            // onOpen={handleOpen}
                            value={this.state.typeOfBelief}
                            onChange={this.handleChange}
                            inputProps={{name: "typeOfBelief"}}
                            >

                            <MenuItem value={"religious"}>Religious</MenuItem>
                            <MenuItem value={"political"}>Political</MenuItem>
                            <MenuItem value={"personal"}>Personal</MenuItem>
                            </Select>
                        </FormControl>
                    </form> 
            </div>

                    <div>
                        <Button
                            className={classes.button}
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
    export default withStyles(styles)(connect(mapState)(QuizViewBeliefs2))
