import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {  Button } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio} from"@material-ui/core";
import StatusBar from '../StatusBar'; 

import './QuizViewBeliefs2.css'

export class QuizViewBeliefs2 extends Component {

componentDidMount() {
    this.props.dispatch({ type: 'FETCH_VALUES'})
    console.log("log")
}


    state = {
            // belief1 : "",
            // belief2 : "",
            // belief3 : " ",
            statusBar : 47
    }


    componentDidMount() {
        this.setState({
            belief1: "",
            belief2: "",
            belief3: ""
        })
    }

    render() {
        return (
            <div>
                 <StatusBar status={this.state.statusBar} />
                 
                <div>
                    <FormControl component="fieldset"
                    //  className={classes.formControl}
                    >

                        <FormLabel component="legend">Beliefs</FormLabel>
                            <RadioGroup
                            aria-label="Beliefs"
                            name="Beliefs"
                            // className=
                            // value=
                            // onChange=
                            >

                            {JSON.stringify(this.props.reduxState)}
                            <FormControlLabel value="belief1" control={<Radio />} label="" />
                            {/* {this.props.beliefs} */}
                            {/* <FormControlLabel value="belief2" control={<Radio />} label="" />{this.props.beliefs.belief2}
                            <FormControlLabel value="belief3" control={<Radio />} label="" />{this.props.beliefs.belief3} */}
                            
                            </RadioGroup>
                    </FormControl>
                </div>

                <div>
                    <Link to="/ElimInstructions5">    
                        <Button
                            color="primary"
                            variant="contained"
                            >
                            Next
                        </Button> 
                    </Link>
                </div>
            </div>
        )
    }
}


const mapState = reduxState => {
    return {
        beliefs : reduxState.beliefs
        }   
    }
    export default connect(mapState)(QuizViewBeliefs2)
