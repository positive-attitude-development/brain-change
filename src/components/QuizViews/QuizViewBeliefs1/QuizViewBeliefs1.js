import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './QuizViewBeliefs1.css'


class QuizViewBeliefs1 extends Component {


state = {
    belief1: "",
    belief2: "",
    belief3: "",
    statusBar : 21

}

//setting beliefs to state
propertyChange = propertyName => (event) => {
    event.preventDefault();
    this.setState({
            [propertyName]: event.target.value
    })
    console.log(this.state);
}


//send beliefs to reducer
handleClick = (event) => {
    if ( this.state.beief1 !== "" && this.state.belief2 !== "" && this.state.belief3 !== "") {
    event.preventDefault();
    // this.state.pop()
    console.log(this.state); 
    this.props.dispatch({ type: "SET_NEW_VALUES" , name:'beliefs', payload: this.state });
    this.props.history.push('/ElimInstructions3')
    }
    else {
        alert("Fill all the beliefs out first before advancing please")
    }
}


    render() {
        return (
            <div>
                <StatusBar status={this.state.statusBar} />

                <div>
                    Type out your 3 beliefs below

                    <ul>Example
                        <li>Climate change is real</li>
                        <li>Attitude is the most important tool for success</li>
                        <li>There is life after death or there is no life after death</li>
                    </ul>

                <div>
                    <TextField
                        type="text"
                        label="First Belief"
                        name="belief1"
                        required
                        fullWidth
                        value={this.state.belief1}
                        onChange={this.propertyChange("belief1")}
                        />
                </div><div>
                          <TextField
                        type="text"
                        label="Second Belief"
                        name="belief2"
                        required
                        fullWidth
                        value={this.state.belief2}
                        onChange={this.propertyChange("belief2")}
                        />
                </div><div>
                          <TextField
                        type="text"
                        label="Third Belief"
                        name="belief3"
                        required
                        fullWidth
                        value={this.state.belief3}
                        onChange={this.propertyChange("belief3")}
                        />
                    </div>
                </div>

                    <Button
                        onClick={this.handleClick}
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
            </div>
        )
    }
}

const mapState = reduxState => {
    return { reduxState }   
    }
    export default connect(mapState)(QuizViewBeliefs1);
