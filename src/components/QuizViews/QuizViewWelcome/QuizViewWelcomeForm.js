import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, MenuItem, TextField} from '@material-ui/core';

class QuizViewWelcomeForm extends Component {

    state = {
        admin_id: 1,
        first_name: '',
        last_name: '',
        category: '',
        age: '',
        gender: '',
        state: '',
        email_address: '',
        phone_number: ''
    };

    handleInputChange = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    submitRegistration = event => {
        event.preventDefault();
        if (this.state.first_name && this.state.last_name && this.state.state) {
            this.props.dispatch({type: 'SELF_REG_PARTICIPANT', payload: this.state});
            this.props.history.push('/ElimInstructions1')
        } else {
            alert('Cannot register --- some required fields were left blank')
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div id="registrationForm">
                    <TextField
                        required
                        margin="normal"
                        label="First Name"
                        value={this.state.first_name}
                        onChange={this.handleInputChange('first_name')} >
                    </TextField>
                    <TextField
                        required
                        margin="normal"
                        label="Last Name"
                        value={this.state.last_name}
                        onChange={this.handleInputChange('last_name')} >
                    </TextField>
                    <TextField
                        type="number"
                        margin="normal"
                        label="Age"
                        value={this.state.age}
                        onChange={this.handleInputChange('age')} >
                    </TextField>
                    <TextField
                        margin="normal"
                        label="Gender"
                        value={this.state.gender}
                        onChange={this.handleInputChange('gender')} >
                    </TextField>
                    <TextField
                        required
                        select
                        style={{width:80}}

                        margin="normal"
                        label="State"
                        value={this.state.state}
                        onChange={this.handleInputChange('state')} >
                        <MenuItem value=""><em>Select State</em></MenuItem>
                        <MenuItem value="AL">Alabama</MenuItem>
                        <MenuItem value="AK">Alaska</MenuItem>
                        <MenuItem value="AZ">Arizona</MenuItem>
                        <MenuItem value="AR">Arkansas</MenuItem>
                        <MenuItem value="CA">California</MenuItem>
                        <MenuItem value="CO">Colorado</MenuItem>
                        <MenuItem value="CT">Connecticut</MenuItem>
                        <MenuItem value="DE">Delaware</MenuItem>
                        <MenuItem value="DC">District of Columbia</MenuItem>
                        <MenuItem value="FL">Florida</MenuItem>
                        <MenuItem value="GA">Georgia</MenuItem>
                        <MenuItem value="HI">Hawaii</MenuItem>
                        <MenuItem value="ID">Idaho</MenuItem>
                        <MenuItem value="IL">Illinois</MenuItem>
                        <MenuItem value="IN">Indiana</MenuItem>
                        <MenuItem value="IA">Iowa</MenuItem>
                        <MenuItem value="KS">Kansas</MenuItem>
                        <MenuItem value="KY">Kentucky</MenuItem>
                        <MenuItem value="LA">Louisiana</MenuItem>
                        <MenuItem value="ME">Maine</MenuItem>
                        <MenuItem value="MD">Maryland</MenuItem>
                        <MenuItem value="MA">Massachusetts</MenuItem>
                        <MenuItem value="MI">Michigan</MenuItem>
                        <MenuItem value="MN">Minnesota</MenuItem>
                        <MenuItem value="MS">Mississippi</MenuItem>
                        <MenuItem value="MO">Missouri</MenuItem>
                        <MenuItem value="MT">Montana</MenuItem>
                        <MenuItem value="NE">Nebraska</MenuItem>
                        <MenuItem value="NV">Nevada</MenuItem>
                        <MenuItem value="NH">New Hampshire</MenuItem>
                        <MenuItem value="NJ">New Jersey</MenuItem>
                        <MenuItem value="NM">New Mexico</MenuItem>
                        <MenuItem value="NY">New York</MenuItem>
                        <MenuItem value="NC">North Carolina</MenuItem>
                        <MenuItem value="ND">North Dakota</MenuItem>
                        <MenuItem value="OH">Ohio</MenuItem>
                        <MenuItem value="OK">Oklahoma</MenuItem>
                        <MenuItem value="OR">Oregon</MenuItem>
                        <MenuItem value="PA">Pennsylvania</MenuItem>
                        <MenuItem value="PR">Puerto Rico</MenuItem>
                        <MenuItem value="RI">Rhode Island</MenuItem>
                        <MenuItem value="SC">South Carolina</MenuItem>
                        <MenuItem value="SD">South Dakota</MenuItem>
                        <MenuItem value="TN">Tennessee</MenuItem>
                        <MenuItem value="TX">Texas</MenuItem>
                        <MenuItem value="UT">Utah</MenuItem>
                        <MenuItem value="VT">Vermont</MenuItem>
                        <MenuItem value="VA">Virginia</MenuItem>
                        <MenuItem value="VI">Virgin Islands</MenuItem>
                        <MenuItem value="WA">Washington</MenuItem>
                        <MenuItem value="WV">West Virginia</MenuItem>
                        <MenuItem value="WI">Wisconsin</MenuItem>
                        <MenuItem value="WY">Wyoming</MenuItem>
                    </TextField>
                    <TextField
                        select
                        margin="normal"
                        style={{width:300}}
                        label="Which best describes you?"
                        value={this.state.category}
                        onChange={this.handleInputChange('category')} >
                        <MenuItem value=""><em>Select Category</em></MenuItem>
                        <MenuItem value="General Public">General Public</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <TextField
                        margin="normal"
                        label="Email Address"
                        value={this.state.email_address}
                        onChange={this.handleInputChange('email_address')} >
                    </TextField>
                    <TextField
                        margin="normal"
                        label="Phone Number"
                        value={this.state.phone_number}
                        onChange={this.handleInputChange('phone_number')} >
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.submitRegistration}
                    >
                        Register and Start
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect()(QuizViewWelcomeForm);