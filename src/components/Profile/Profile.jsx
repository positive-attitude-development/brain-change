import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, TextField, Button, MenuItem, Dialog, DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {

	},
	card: {
		margin: 'auto',
		marginTop: '30px',
		width: '75%',
		padding: '20px',
	}
}

class Profile extends Component{

	state = {
		isEditable: false
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_PROFILE', payload: this.props.admin.id})
	};//end componentDidMount

	handleChange = propertyName => (event) => {
		this.props.dispatch({type: 'EDIT_PROFILE', payload: {property: propertyName, value: event.target.value}})
	};//end handleChange

	handleEdit = () => {
		this.setState({
			isEditable: true,
		})
		//need to set up separate editProfileReducer to handle any edits made to profile, this way
		//any changes can be made to the editProfileReducer so if Cancel Edit button is clicked, 
		//profile will revert back to profileReducer info and no changes are made to database
		this.props.dispatch({type: 'SET_EDIT_PROFILE', payload: this.props.profile[0]})
	};//end handleEdit

	handleCancelEdit = () => {
		this.setState({
			isEditable: false
		})
		//dispatch to editProfileReducer to clear reducer state in case any edits were made
		this.props.dispatch({type: 'CANCEL_EDIT'})
	};//end handleCancelEdit

	saveChanges = () => {
		this.props.dispatch({type: 'UPDATE_PROFILE', payload: this.props.edit})
		this.setState({
			isEditable: false
		})
	}

	render(){
		const {classes} = this.props;
		console.log('this.props.admin:', this.props.admin)
		return(
			<div>
				{this.props.profile.map((profile) =>{
					let accessLevel;
					if(profile.level === 2){
						accessLevel = <p>Account Status: Pending Approval</p>
					}
					return(
						<Card raised key={profile.id} className={classes.card}>
							<CardContent>
								<h3>{profile.first_name}'s Profile</h3>
								{accessLevel}
								<TextField label="Username:" value={profile.username} disabled/>

								<TextField label="First Name:" value={profile.first_name} disabled/>

								<TextField label="Last Name:" value={profile.last_name} disabled/>

								<TextField label="Title:" value={profile.title} disabled/>

								<TextField label="Organization:" value={profile.organization} disabled/>

								<TextField label="Phone Number:" value={profile.phone_number} disabled/>

								<TextField label="Email Address:" value={profile.email_address} disabled/>

								<TextField label="Street Address Line 1:" value={profile.street_address} disabled/>

								<TextField label="Street Address Line 2:" value={profile.street_address2} disabled/>

								<TextField label="City:" value={profile.city} disabled/>

								<TextField select margin="normal" disabled
									label="State:" value={profile.state}>
									<MenuItem value={profile.state}>{profile.state}</MenuItem>
								</TextField>

								<TextField label="Zipcode:" value={profile.zipcode} disabled/>
							</CardContent>
							<CardActions>
								<Button variant="contained" color="primary" onClick={this.handleEdit}>Edit Profile</Button>
							</CardActions>

							<Dialog open={this.state.isEditable} onClose={this.handleCancelEdit} disableBackdropClick={true}>
								<DialogTitle>{profile.first_name}'s Profile</DialogTitle>
								<DialogContent>

								<TextField label="Username:" defaultValue={profile.username}
									onChange={this.handleChange('username')}/>

								<TextField label="First Name:" defaultValue={profile.first_name}
									onChange={this.handleChange('first_name')}/>

								<TextField label="Last Name:" defaultValue={profile.last_name}
									onChange={this.handleChange('last_name')}/>

								<TextField label="Title:" defaultValue={profile.title}
									onChange={this.handleChange('title')}/>

								<TextField label="Organization:" defaultValue={profile.organization}
									onChange={this.handleChange('organization')}/>

								<TextField label="Phone Number:" defaultValue={profile.phone_number}
									onChange={this.handleChange('phone_number')}/>

								<TextField label="Email Address:" defaultValue={profile.email_address}
									onChange={this.handleChange('email_address')}/>

								<TextField label="Street Address Line 1:" defaultValue={profile.street_address}
									onChange={this.handleChange('street_address')}/>

								<TextField label="Street Address Line 2:" defaultValue={profile.street_address2}
									onChange={this.handleChange('street_address2')}/>

								<TextField label="City:" defaultValue={profile.city}
									onChange={this.handleChange('city')}/>

								<TextField select margin="normal" onChange={this.handleChange('state')}
									label="State:" value={this.props.edit.state}>
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

								<TextField label="Zipcode:" defaultValue={profile.zipcode} onChange={this.handleChange('zipcode')}/>
            
								</DialogContent>
									<DialogActions>
										<Button onClick={this.handleCancelEdit} color="primary">Cancel Edit</Button>
										<Button onClick={this.saveChanges} variant="contained" color="primary">Save Changes</Button>
									</DialogActions>
							</Dialog>
						</Card>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  profile: state.profile,
  edit: state.editProfile,
});

export default withStyles(styles)(connect(mapStateToProps)(Profile));