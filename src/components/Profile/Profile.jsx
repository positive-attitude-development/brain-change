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
		width: '90%',
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
								<TextField className={classes.menu} label="Username:" value={profile.username} disabled/>

								<TextField className={classes.menu} label="First Name:" value={profile.first_name} disabled/>

								<TextField className={classes.menu} label="Last Name:" value={profile.last_name} disabled/>

								<TextField className={classes.menu} label="Title:" value={profile.title} disabled/>

								<TextField className={classes.menu} label="Organization:" value={profile.organization} disabled/>

								<TextField className={classes.menu} label="Phone Number:" value={profile.phone_number} disabled/>

								<TextField className={classes.menuLg} label="Email Address:" value={profile.email_address} disabled/>

								<TextField className={classes.menuLg} label="Street Address Line 1:" value={profile.street_address} disabled/>

								<TextField className={classes.menuLg} label="Street Address Line 2:" value={profile.street_address2} disabled/>

								<TextField className={classes.menu} label="City:" value={profile.city} disabled/>

								<TextField select className={classes.menu} margin="normal" disabled
									label="State:" value={profile.state}>
									<MenuItem value={profile.state}>{profile.state}</MenuItem>
								</TextField>

								<TextField className={classes.menu} label="Zipcode:" value={profile.zipcode} disabled/>
							</CardContent>
							<CardActions>
								<Button size="large" variant="contained" color="primary" onClick={this.handleEdit}>Edit Profile</Button>
							</CardActions>

							<Dialog open={this.state.isEditable} onClose={this.handleCancelEdit} disableBackdropClick={true}>
								<DialogTitle>{profile.first_name}'s Profile</DialogTitle>
								<DialogContent>

									<TextField className={classes.menu} label="Username:" defaultValue={profile.username}
									onChange={this.handleChange('username')}/>

									<TextField className={classes.menu} label="First Name:" defaultValue={profile.first_name}
									onChange={this.handleChange('first_name')}/>

									<TextField className={classes.menu} label="Last Name:" defaultValue={profile.last_name}
										onChange={this.handleChange('last_name')}/>

									<TextField className={classes.menu} label="Title:" defaultValue={profile.title}
										onChange={this.handleChange('title')}/>

									<TextField className={classes.menu} label="Organization:" defaultValue={profile.organization}
										onChange={this.handleChange('organization')}/>

									<TextField className={classes.menu} label="Phone Number:" defaultValue={profile.phone_number}
										onChange={this.handleChange('phone_number')}/>

									<TextField className={classes.menuLg} label="Email Address:" defaultValue={profile.email_address}
									onChange={this.handleChange('email_address')}/>

									<TextField className={classes.menuLg} label="Street Address Line 1:" defaultValue={profile.street_address}
									onChange={this.handleChange('street_address')}/>

									<TextField className={classes.menuLg} label="Street Address Line 2:" defaultValue={profile.street_address2}
									onChange={this.handleChange('street_address2')}/>

									<TextField className={classes.menu} label="City:" defaultValue={profile.city}
									onChange={this.handleChange('city')}/>

									<TextField select className={classes.menu} margin="normal" onChange={this.handleChange('state')}
									label="State:" value={this.props.edit.state}>
									{this.props.stateNames.map(stateName => {
										return (<MenuItem key={stateName.abbr} value={stateName.abbr}>{stateName.full}</MenuItem>
										)
									})}
								</TextField>

								<TextField label="Zipcode:" defaultValue={profile.zipcode} onChange={this.handleChange('zipcode')}/>
            
								</DialogContent>
									<DialogActions>
										<Button size="large" onClick={this.handleCancelEdit} color="primary">Cancel Edit</Button>
										<Button size="large" onClick={this.saveChanges} variant="contained" color="primary">Save Changes</Button>
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
  stateNames: state.stateNames,
});

export default withStyles(styles)(connect(mapStateToProps)(Profile));