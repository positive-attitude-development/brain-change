import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
// import Radio from '@material-ui/core/Radio';

import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio} from"@material-ui/core";

export class QuizViewBeliefs2 extends Component {


    state = {
            belief1 : "",
            belief2 : "",
            belief3 : ""
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
                            <FormControlLabel value="belief1" control={<Radio />} label="" />{this.state.belief1}
                            <FormControlLabel value="belief2" control={<Radio />} label="" />{this.state.belief2}
                            <FormControlLabel value="belief3" control={<Radio />} label="" />{this.state.belief3}
                            
                            </RadioGroup>
                    </FormControl>
                </div>

                <div>
                    <Link to="/ElimInstructions5"> link </Link>
                </div>
            </div>
        )
    }
}


const mapState = reduxState => {
    return {
        reduxState
        }   
    }
    export default connect(mapState)(QuizViewBeliefs2)
