import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, TextField, Button, MenuItem, Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Chance} from 'chance';
import MyParticipantsTable from './MyParticipantsTable';

const styles = {
	root: {
		flexWrap: 'wrap'
	},
	card: {
		margin: 'auto',
		marginTop: '30px',
		marginBottom: '40px',
		width: '90%',
	},
	menu: {
		marginTop: '5px',
		marginLeft: '5px',
		width: '150px',
	}
}

class MyParticipants extends Component{
	state = {
		participant: {
			first_name: '',
			last_name: '',
			age: '',
			gender: '',
			category_id: '',
			state: '',
			email_address: '',
			phone_number: '',
			url: '',
		},
		offender: {
			system_id: '',
			offender_system_id: '',
			felon: '',
			violent_offender: '',
			population_id: ''
		}
	}

	componentDidMount(){
		//on component mount, fetch all participants, as well as category, system, and population info from database to populate dropdowns
		this.props.dispatch({type: 'FETCH_PARTICIPANTS'});
		this.props.dispatch({type: 'FETCH_CATEGORY'});
		this.props.dispatch({type: 'FETCH_SYSTEM'});
		this.props.dispatch({type: 'FETCH_POPULATION'});
		this.generateLink();
	};//end componentDidMount

	generateLink = () => {
		//generate uniqure url invite link and assign to local state on page load
		let chance = new Chance();
		let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
		this.setState({
			participant: {
				...this.state.participant,
				url: urlLink
			}
		});
	};//end generateLink

	handleInputChange = propertyName => event => {
	    this.setState({
			participant: {
				...this.state.participant,
				[propertyName]: event.target.value,
			}
	    });
	};//end handleInputChange

	handleOffenderInput = propertyName => event => {
	    this.setState({
			offender: {
				...this.state.offender,
				[propertyName]: event.target.value,
			}
	    });
	};//end handleOffenderInput

	handleSubmit = () => {
		this.props.dispatch({type: 'ADD_PARTICIPANT', payload: this.state, history: this.props.history});
	};//end handleSubmit

	renderInputs = () => {
		const {classes} = this.props

		if (this.state.participant.category_id === 1) {
			
			return <div id="offenderInputs">
				<h5>Offender Data:</h5>

				<TextField
					required
					select
					margin="normal"
					label="System:"
					className={classes.menu}
					value={this.state.offender.offender_system_id}
					onChange={this.handleOffenderInput('offender_system_id')} 
				>
					{this.props.system.map(system => {
						return (
							<MenuItem key={system.id} value={system.id} >
								{system.system}
							</MenuItem>
						)
					})}
				</TextField>

				<TextField
					required
					label="System ID #:" 
					margin="normal"
					className={classes.menu} 
					value={this.state.offender.system_id}
					onChange={this.handleOffenderInput('system_id')}
				/>

				<TextField 
					required 
					select 
					margin="normal" 
					label="Population:" 
					value={this.state.offender.population_id} 
					onChange={this.handleOffenderInput('population_id')} 
					className={classes.menu}
				>
					{this.props.population.map(population => {
						return (
							<MenuItem key={population.id} value={population.id} >{population.population}</MenuItem>
						)
					})}
				</TextField>

				<TextField
					required 
					select 
					margin="normal" 
					label="Felony?:" 
					value={this.state.offender.felon}
					onChange={this.handleOffenderInput('felon')} 
					className={classes.menu} 
				>
					<MenuItem value={true}>Yes</MenuItem>
					<MenuItem value={false}>No</MenuItem>
				</TextField>

				<TextField 
					required 
					select 
					margin="normal" 
					label="Violent Crime?:" 
					value={this.state.offender.violent_offender}
					onChange={this.handleOffenderInput('violent_offender')} 
					className={classes.menu} 
				>
					<MenuItem value={true}>Yes</MenuItem>
					<MenuItem value={false}>No</MenuItem>
				</TextField>
			</div>
		}
	};//end renderInputs

	viewParticipant = id => {
		this.props.history.push(`/individualparticipant/${id}`);
	};//end viewParticipant

	render(){
		const {classes} = this.props;

		//conditionally render submit button
		let submitButton;
		if (this.state.participant.first_name && this.state.participant.last_name
			&& this.state.participant.age && this.state.participant.gender
			&& this.state.participant.category_id > 1 && this.state.participant.state
			&& this.state.participant.url) {
				//if local state contains first name, last name, age, gender, state, url, and category isn't offender, enable submitButton
				submitButton = <Button size="large" variant="contained" color="primary" onClick={this.handleSubmit}>Add Participant</Button>
		} else if (this.state.participant.first_name && this.state.participant.last_name
			&& this.state.participant.url && this.state.participant.age
			&& this.state.participant.gender && this.state.participant.category_id === 1
			&& this.state.participant.state && this.state.offender.system_id
			&& this.state.offender.offender_system_id && this.state.offender.felon !== ''
			&& this.state.offender.violent_offender !== '' && this.state.offender.population_id) {
				//if category is offender and local state contains first name, last name, age, gender, state, url, system_id, offender_system_id, felon, and violent_offender, enable submitButton
				submitButton = <Button size="large" variant="contained" color="primary" onClick={this.handleSubmit}>Add Participant</Button>
		} else {
				//otherwise, disable submit button
				submitButton = <Button size="large" variant="contained" color="primary" disabled>Add Participant</Button>
		} //end submitButton conditionals

		return(
			<Grid className={classes.root}>
				<Card raised className={classes.card}>
					<CardContent>

						<h3>Add a Participant:</h3>
						<h5>(*Required fields)</h5>

						<TextField
							required 
							className={classes.menu} 
							margin="normal"
							label="First Name:" 
							onChange={this.handleInputChange('first_name')} 
							value={this.state.participant.first_name}
						/>

						<TextField 
							required 
							className={classes.menu} 
							margin="normal"
							label="Last Name:" 
							onChange={this.handleInputChange('last_name')} 
							value={this.state.participant.last_name}
						/>

						<TextField 
							required 
							className={classes.menu} 
							margin="normal"
							label="Age:" 
							type="number" 
							onChange={this.handleInputChange('age')} 
							value={this.state.participant.age}
						/>

						<TextField 
							required 
							label="Gender:" 
							select 
							margin="normal" 
							onChange={this.handleInputChange('gender')} 
							value={this.state.participant.gender} 
							className={classes.menu}
						>
							<MenuItem value="M">Male</MenuItem>
							<MenuItem value="F">Female</MenuItem>
							<MenuItem value="Other">Other</MenuItem>
							<MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
						</TextField>
							
						<TextField 
							required 
							label="Category:" 
							select 
							margin="normal" 
							onChange={this.handleInputChange('category_id')} 
							value={this.state.participant.category_id}
							className={classes.menu}
						>
							{this.props.category.map(category => {
								return (
									<MenuItem key={category.id} value={category.id} >
										{category.category}
									</MenuItem>
								)
							})}
						</TextField>

						<TextField 
							required 
							select 
							margin="normal" 
							label="State:" 
							value={this.state.participant.state} 
							onChange={this.handleInputChange('state')} 
							className={classes.menu}
						>
							{this.props.stateNames.map((stateName, i) => {
								return (
									<MenuItem key={i} value={stateName.abbr} >
										{stateName.full}
									</MenuItem>
								)
							})}
						</TextField>

						<TextField
							className={classes.menu} 
							label="Email Address:" 
							helperText="Optional"
							style={{ width : 200 }}
							margin="normal"
							onChange={this.handleInputChange('email_address')} 
							value={this.state.participant.email_address}
						/>

						<TextField 
							className={classes.menu}
							margin="normal"
							label="Phone Number:" 
							helperText="Optional"
							style={{ width:200 }}
							onChange={this.handleInputChange('phone_number')} 
							value={this.state.participant.phone_number}
						/>

						{this.renderInputs()}

					</CardContent>

					<CardActions>
						{submitButton}
					</CardActions>

				</Card>
	
				<Card raised className={classes.card}>
					<CardContent>
						<h3>My Participants:</h3>
						{this.props.participant[0] &&
							<MyParticipantsTable history={this.props.history} />
						}
					</CardContent>
				</Card>

			</Grid>
		)
	} //end render
}

const mapRedux = state => ({
  participant: state.participant,
  category: state.category,
  stateNames: state.stateNames,
  addParticipant: state.addParticipant,
  population: state.population,
  system: state.system,
});

export default withStyles(styles)(connect(mapRedux)(MyParticipants));