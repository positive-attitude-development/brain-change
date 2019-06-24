import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';



export class QuizViewBeliefs1 extends Component {


state = {
    belief1: " ",
    belief2: " ",
    belief3: " ",
}


propertyChange = propertyName => (event) => {
    event.preventDefault();
    this.setState({
        [propertyName]: event.target.value
    })
    console.log(this.state);
}

sendBeliefs = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "" , payload: this.state })
}


    render() {
        return (
            <div>
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
                color="primary"
                variant="contained"
                onClick={this.sendBeliefs}
                >
                Next  
                </Button>
                <Link to="/ElimInstructions3"> link </Link>
            </div>
        )
    }
}

const mapState = reduxState => {
    return { reduxState }   
    }
    export default connect(mapState)(QuizViewBeliefs1);
