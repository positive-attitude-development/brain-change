import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormGroup, FormControlLabel, TextField, Select, MenuItem, OutlinedInput} from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
	firstName: '',
	lastName: '',
	organization: '',
	title: '',
	phoneNumber: '',
	emailAddress: '',
	streetAddress: '',
	streetAddressTwo: '',
	city: '',
	state: '',
	zipcode: 0,
	level: 2
  };

  registerAdmin = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.firstName && 
	this.state.lastName && this.state.organization && this.state.title && 
	this.state.phoneNumber && this.state.emailAddress && this.state.state) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
        	username: this.state.username,
        	password: this.state.password,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			organization: this.state.organization,
			title: this.state.title,
			phoneNumber: this.state.phoneNumber,
			emailAddress: this.state.emailAddress,
			streetAddress: this.state.streetAddress,
			streetAddressTwo: this.state.streetAddressTwo,
			city: this.state.city,
			state: this.state.state,
			zipcode: this.state.zipcode,
			level: this.state.level
        },
		history: this.props.history
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerAdmin

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  fillData = () =>{
	  this.setState({
		username: 'test',
	    password: 'test',
		firstName: 'test',
		lastName: 'test',
		organization: 'test',
		title: 'test',
		phoneNumber: 'test',
		emailAddress: 'test',

		state: 'MN',
	  })
  }

  render() {
    return (
      <div>
		  <button onClick={this.fillData}>Fill Data</button>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
		<form onSubmit={this.registerAdmin}>
        <FormGroup>
          <h2>Register Owner/Admin</h2>
          <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.username} onChange={this.handleInputChangeFor('username')}/>}
        	label="Username:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.password} onChange={this.handleInputChangeFor('password')}/>}
        	label="Password:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.firstName} onChange={this.handleInputChangeFor('firstName')}/>}
        	label="First Name:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.lastName} onChange={this.handleInputChangeFor('lastName')}/>}
        	label="Last Name:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.organization} onChange={this.handleInputChangeFor('organization')}/>}
        	label="Organization:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.title} onChange={this.handleInputChangeFor('title')}/>}
        	label="Title:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.phoneNumber} onChange={this.handleInputChangeFor('phoneNumber')}/>}
        	label="Phone Number:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField required label="Required"
				value={this.state.emailAddress} onChange={this.handleInputChangeFor('emailAddress')}/>}
        	label="Email Address:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField value={this.state.streetAddress}
                onChange={this.handleInputChangeFor('streetAddress')}/>}
        	label="Street Address:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField value={this.state.streetAddressTwo}
                onChange={this.handleInputChangeFor('streetAddressTwo')}/>}
        	label="Street Address Line 2:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField value={this.state.city}
                onChange={this.handleInputChangeFor('city')}/>}
        	label="City:" labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={
				<Select required value={this.state.state}
				onChange={this.handleInputChangeFor('state')} label="Required"
				input={<OutlinedInput name="state" labelWidth={100} id="outlined-age-native-simple"/>}>
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
				</Select>}
        	label="State:"
			labelPlacement="start"/>
          </div>

		  <div>
			<FormControlLabel control={<TextField value={this.state.zipcode}
                onChange={this.handleInputChangeFor('zipcode')}/>}
        	label="Zipcode:" labelPlacement="start"/>
          </div>

          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"/>
          </div>
        </FormGroup>
		</form>
        <center>
          <button type="button" className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}>
            Login
          </button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

