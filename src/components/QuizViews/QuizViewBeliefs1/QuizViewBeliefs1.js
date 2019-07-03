import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TextField, Button, Paper } from '@material-ui/core';
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
        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })

    console.log(this.state);
 
}


//send beliefs to reducer
handleClick = (event) => {
    event.preventDefault();
    if ( this.state.beief1 !== "" && this.state.belief2 !== "" && this.state.belief3 !== "") {
   
        let next = new Date(); 
        let sec = next.getSeconds();
        let min = next.getMinutes(); 
        let hour = next.getHours(); 

        let nextTime = ((min * 60 ) + (hour * 360) + sec)
        let belief1Time = nextTime - this.state.time 

    console.log(this.state); 
    this.props.dispatch({ type: "SET_NEW_VALUES" , name:'beliefs', payload: this.state });
    this.props.dispatch({type: 'SET_NEW_TIME', name: 'belief1Time', payload: belief1Time });
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
                    <h2 className="title">Type out your 3 beliefs below </h2>

                 <Paper >
                   <div className="examples" >
                       <h4 align="center"> Here are some examples: </h4>
                    <ul> 
                        <li>Climate change is real</li>
                        <li>Attitude is the most important tool for success</li>
                        <li>There is life after death or there is no life after death</li>
                    </ul>
                </div>
            <div className ="inputs">
                <div>
                    <TextField
                        type="text"
                        label="First Belief"
                        name="belief1"
                        style={{width:700}}
                        required
                        value={this.state.belief1}
                        onChange={this.propertyChange("belief1")}
                        />
                </div><div>
                          <TextField
                        type="text"
                        label="Second Belief"
                        style={{width:700}}
                        inputProps = {{maxLength: 20}}
                        name="belief2"
                        required
                        value={this.state.belief2}
                        onChange={this.propertyChange("belief2")}
                        />
                    
                </div><div>
                          <TextField
                        type="text"
                        label="Third Belief"
                        name="belief3"
                        required
                        style={{width:700}}
                        value={this.state.belief3}
                        onChange={this.propertyChange("belief3")}
                        />
                    </div>
                </div>
                </Paper>
                </div>
                <div className = "button">
                {/* <Grid container justify="center"> */}
                    <Button
                        
                        className= "button"
                        onClick={this.handleClick}
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
                </div>
                {/* </Grid> */}
            </div>
        )
    }
}

const mapState = reduxState => {
    return { reduxState }   
    }
    export default connect(mapState)(QuizViewBeliefs1);
