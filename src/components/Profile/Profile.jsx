import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, TextField, Button, FormControlLabel} from '@material-ui/core';
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
		isEditable: false,

	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_PROFILE', payload: this.props.admin.id})
		this.setState({
			...this.state,
			profile: this.props.profile[0],
		})
	};//end componentDidMount

	handleChange = propertyName => (event) => {
		console.log(event.target.value)
		this.props.dispatch({type: 'EDIT_PROFILE'})
	};//end handleChange

	handleEdit = () => {
		this.setState({
			isEditable: true
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

	render(){
		const {classes} = this.props;
		console.log('editProfile reducer:', this.props.edit)
		return(
			<div>
				{this.state.isEditable ?
				<>
					{this.props.profile.map((profile, i) => {
					return(
						<Card raised key={profile.id} className={classes.card}>
							<CardContent>
								<h3>{profile.first_name}'s Profile</h3>

								<FormControlLabel control={<TextField defaultValue={profile.username}
									  onChange={this.handleChange('username')}/>}
        						label="Username:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.first_name}/>}
        						label="First Name:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.last_name}/>}
        						label="Last Name:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.title}/>}
        						label="Title:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.organization}
									  onChange={this.handleChange('organization')}/>}
        						label="Organization:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.phone_number}/>}
        						label="Phone Number:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.email_address}/>}
        						label="Email Address:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.street_address}/>}
        						label="Street Address Line 1:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.street_address2}/>}
        						label="Street Address Line 2:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.city}/>}
        						label="City:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.state}/>}
        						label="State:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.zipcode}/>}
        						label="Zipcode:" labelPlacement="start"/>
							</CardContent>
							<CardActions>
								<Button variant="contained" color="primary" onClick={this.handleCancelEdit}>Cancel Edit</Button>
								<Button>Save Changes</Button>
							</CardActions>
						</Card>
					)
				})}
				</>//end isEditable
				:
				<>
					{this.props.profile.map((profile, i) => {
					return(
						<Card raised key={profile.id} className={classes.card}>
							<CardContent>
								<h3>{profile.first_name}'s Profile</h3>
								<FormControlLabel control={<TextField defaultValue={profile.username} disabled/>}
        						label="Username:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.first_name} disabled/>}
        						label="First Name:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.last_name} disabled/>}
        						label="Last Name:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.title} disabled/>}
        						label="Title:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.organization} disabled/>}
        						label="Organization:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.phone_number} disabled/>}
        						label="Phone Number:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.email_address} disabled/>}
        						label="Email Address:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.street_address} disabled/>}
        						label="Street Address Line 1:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.street_address2} disabled/>}
        						label="Street Address Line 2:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.city} disabled/>}
        						label="City:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.state} disabled/>}
        						label="State:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={profile.zipcode} disabled/>}
        						label="Zipcode:" labelPlacement="start"/>
							</CardContent>
							<CardActions>
								<Button variant="contained" color="primary" onClick={this.handleEdit}>Edit Profile</Button>
							</CardActions>
						</Card>
					)
				})}
				</>//end isNOTeditable
				}

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