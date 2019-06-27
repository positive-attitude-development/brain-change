import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, Grid, TextField, Button, MenuItem, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Chance} from 'chance';

const styles = {
	root: {

	},
	card: {
		margin: 'auto',
		marginTop: '30px',
		marginBottom: '40px',
		width: '75%',
	},
	grid: {
		width: '75%',
	}
}

class IndividualParticipant extends Component{

	state = {
		urlLink: '',
		isEditable: false,
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_INDIVIDUAL', payload: this.props.match.params.id})
		//this.generateLink();
	};//end componentDidMount

	generateLink = () => {
		let chance = new Chance();
		console.log('generateLink')
		if(this.state.urlLink === ''){
			let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
			console.log('urlLink:', urlLink)
			this.setState({
				urlLink: urlLink,
			})
		}
	};//end generateLink

	handleEdit = () => {
		this.setState({
			isEditable: true
		})
	};//end handleEdit

	handleCancelEdit = () => {
		this.setState({
			isEditable: false
		})
	};//end handleCancelEdit

	render(){
		const classes = this.props;
		let offenderData;
		return(
			<>
			{this.state.isEditable ?
				//EDITABLE
				<>
				<p>EDITABLE</p>
				<Button variant="contained" color="primary" onClick={this.handleCancelEdit}>Cancel Edit</Button>
				</>//end isEditable
				:
				//NOT EDITABLE
				<>
				
			<Grid className={classes.grid}>
			{this.props.individual.map((person) => {
				if(person.category === 'Offender'){
					offenderData = 
					<>
					<br></br>Offender Data:<br></br>

						<TextField select margin="normal" disabled
						label="System:" value={person.offender_system_id}>
								<MenuItem></MenuItem>
						</TextField>

						{/* <TextField disabled label="System:" defaultValue={person.offender_system_id}/> */}

						<TextField disabled label="System ID#:" defaultValue={person.system_id}/>

						<TextField disabled label="Violent:" defaultValue={person.violent_offender}/>

						<TextField disabled label="Felon:" defaultValue={person.felon}/>

						<TextField disabled label="Population:" defaultValue={person.population_id}/>
					</>
				} else {
					offenderData = <div></div>
				}
				return(
					<Card raised className={classes.card} key={person.id}>
						<CardContent>
							<h3>Participant: {person.first_name} {person.last_name}</h3>

								<TextField disabled label="First Name:" defaultValue={person.first_name}/>

								<TextField disabled label="Last Name:" defaultValue={person.last_name}/>

								<TextField disabled label="Age:" defaultValue={person.age}/>

								<TextField disabled label="Gender:" defaultValue={person.gender}/>

								<TextField disabled label="Category:" defaultValue={person.category}/>

								<TextField disabled label="Email Address:" defaultValue={person.email}/>

								<TextField disabled label="Phone Number:" defaultValue={person.phone_number}/>
								<br></br>

								{offenderData}
								<br></br>

						</CardContent>
						<CardActions>
							<Button variant="contained" color="primary" onClick={this.handleEdit}>Edit Participant</Button>
						</CardActions>
					</Card>
					)
				})}

				<Paper>
					URL Stuff:
						<TextField disabled label="Invite Link:" defaultValue="URL Link"/>
						<TextField disabled label="Expiration Date:" defaultValue="01/01/2019"/>
						<Button variant="contained" color="secondary">Generate New Invite Link</Button>
				</Paper>

				<Card>
					<CardContent>
						IMAGINE SNAPSHOT HERE
					</CardContent>
				</Card>
			</Grid>
			</>//end isNOTeditable
			}
			</>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  profile: state.profile,
  individual: state.individual,
  category: state.category,
  population: state.population,
  system: state.system,
});

export default withStyles(styles)(connect(mapStateToProps)(IndividualParticipant));