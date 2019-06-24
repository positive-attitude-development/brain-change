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
		isEditable: false
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_PROFILE', payload: this.props.admin.id})
	}

	handleEdit = () => {
		this.setState({
			isEditable: !this.state.isEditable
		})
	};//end handleEdit

	render(){
		const {classes} = this.props;
		return(
			<div>
				{this.state.isEditable ?
				<>
					{this.props.profile.map((profile, i) => {
					return(
						<Card raised key={profile.id} className={classes.card}>
							<CardContent>
								<h3>{profile.first_name}'s Profile</h3>

								<FormControlLabel control={
          							<TextField defaultValue={profile.username}/>}
        						label="Username: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.first_name}/>}
        						label="First Name: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.last_name}/>}
        						label="Last Name: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.title}/>}
        						label="Title: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.organization}/>}
        						label="Organization: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.phone_number}/>}
        						label="Phone Number: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.email_address}/>}
        						label="Email Address: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.street_address}/>}
        						label="Street Address Line 1: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.street_address2}/>}
        						label="Street Address Line 2: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.city}/>}
        						label="City: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.state}/>}
        						label="State: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.zipcode}/>}
        						label="Zipcode: "
								labelPlacement="start"/>
							</CardContent>
							<CardActions>
								<Button variant="contained" color="primary" onClick={this.handleEdit}>Cancel Edit</Button>
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
								<FormControlLabel control={
          							<TextField defaultValue={profile.username} disabled/>}
        						label="Username: "
								labelPlacement="start"/>
								<FormControlLabel control={
          							<TextField defaultValue={profile.first_name} disabled/>}
        						label="First Name: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.last_name} disabled/>}
        						label="Last Name: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.title} disabled/>}
        						label="Title: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.organization} disabled/>}
        						label="Organization: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.phone_number} disabled/>}
        						label="Phone Number: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.email_address} disabled/>}
        						label="Email Address: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.street_address} disabled/>}
        						label="Street Address Line 1: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.street_address2} disabled/>}
        						label="Street Address Line 2: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.city} disabled/>}
        						label="City: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.state} disabled/>}
        						label="State: "
								labelPlacement="start"/>

								<FormControlLabel control={
          							<TextField defaultValue={profile.zipcode} disabled/>}
        						label="Zipcode: "
								labelPlacement="start"/>
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
  profile: state.profile
});

export default withStyles(styles)(connect(mapStateToProps)(Profile));