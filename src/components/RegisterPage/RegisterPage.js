import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, TextField, MenuItem, Card, CardContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	card: {
		width: '90%',
		margin: '30px auto',
		textAlign: 'center',
	},
	menu: {
		marginTop: '5px',
		marginLeft: '5px',
		width: '150px',
	},
	menuLg: {
		marginTop: '5px',
		marginLeft: '5px',
		width: '200px',
	},
	buttonArea: {
		marginTop: '30px',
		marginBottom: '30px',
	}
}

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
		zipcode: '',
		level: 2
	};

  registerAdmin = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.firstName && 
	this.state.lastName && this.state.organization && this.state.title && 
	this.state.phoneNumber && this.state.emailAddress && this.state.state) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: this.state,
		history: this.props.history
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerAdmin

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
	  const {classes} = this.props;

    return (
      <Card className={classes.card}>
		  <CardContent>
			{/* error block */}
			{this.props.errors.registrationMessage && (
				<h2 className="alert" role="alert">
					{this.props.errors.registrationMessage}
				</h2>
			)}
			{/* registration form */}
			<form onSubmit={this.registerAdmin}>
				<h2>Admin Registration</h2>
				<div>
					<TextField
						required 
						label="Username" 
						className={classes.menu}
						value={this.state.username}
						onChange={this.handleInputChangeFor('username')} />
					<TextField 
						required
						type="password"
						label="Password" 
						className={classes.menu}
						value={this.state.password} 
						onChange={this.handleInputChangeFor('password')} />
				</div>
				<div>
					<TextField 
						required 
						label="First Name" 
						className={classes.menu}
						value={this.state.firstName} 
						onChange={this.handleInputChangeFor('firstName')} />
					<TextField 
						required 
						label="Last Name"
						className={classes.menu}
						value={this.state.lastName} 
						onChange={this.handleInputChangeFor('lastName')} />
					<TextField 
						required 
						label="Organization" 
						className={classes.menu}
						value={this.state.organization} 
						onChange={this.handleInputChangeFor('organization')} />
					<TextField 
						required 
						label="Title" 
						className={classes.menu}
						value={this.state.title} 
						onChange={this.handleInputChangeFor('title')} />
				</div>
				<div>
					<TextField 
						required 
						label="Phone Number" 
						className={classes.menu}
						value={this.state.phoneNumber} 
						onChange={this.handleInputChangeFor('phoneNumber')} />
					<TextField 
						required 
						label="Email Address" 
						className={classes.menu}
						value={this.state.emailAddress} 
						onChange={this.handleInputChangeFor('emailAddress')} />
					<TextField 
						value={this.state.streetAddress} 
						label="Street Address" 
						className={classes.menuLg}
						onChange={this.handleInputChangeFor('streetAddress')} />
					<TextField 
						value={this.state.streetAddressTwo} 
						label="Street Address Line 2" 
						className={classes.menuLg}
						onChange={this.handleInputChangeFor('streetAddressTwo')} />
				</div>
				<div>
					<TextField 
						value={this.state.city} 
						label="City" 
						className={classes.menu}
						onChange={this.handleInputChangeFor('city')} />
					<TextField 
						select 
						required 
						value={this.state.state} 
						className={classes.menu}
						onChange={this.handleInputChangeFor('state')} 
						label="State">
						{this.props.stateNames.map(stateName => {
							return ( <MenuItem key={stateName.abbr} value={stateName.abbr}>{stateName.full}</MenuItem> )
						})}	
					</TextField>
					<TextField 
						value={this.state.zipcode} 
						label="Zipcode" 
						className={classes.menu}
						onChange={this.handleInputChangeFor('zipcode')}/>
				</div>
				<div className={classes.buttonArea}>
					<Button 
						type="submit"
						variant="contained"
						color="primary"
						size="large" >
						Register
					</Button>
				</div>
			</form>

			<center>
			<button type="button" className="link-button"
				onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}>
				Login
			</button>
			</center>

		</CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  stateNames: state.stateNames,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));
