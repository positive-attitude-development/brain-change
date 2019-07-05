import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, Tooltip, Grid, TextField, Button, MenuItem, Dialog, DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Chance} from 'chance';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import moment from 'moment';

const styles = {
	root: {

	},
	card: {
		margin: 'auto',
		marginTop: '30px',
		marginBottom: '40px',
		width: '90%',
	},
	menu: {
		margin: 'auto',
		marginLeft: '5px',
		width: '120px',
	},
	text: {
		margin: '10px',
		width: '120px',
	},
	urlText: {
		width: '200px',
	}
}

class IndividualParticipant extends Component{

	state = {
		beliefs: [],
		coreValues: [],
		coreViolators: [],
		corePercent: '',
		violatorPercent: '',
		isEditable: false,
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_INDIVIDUAL', payload: this.props.match.params.id})
		//this.props.dispatch({type: 'FETCH_URL', payload: this.props.match.params.id})
		this.props.dispatch({type: 'FETCH_CATEGORY'})
		this.props.dispatch({type: 'FETCH_SYSTEM'})
		this.props.dispatch({type: 'FETCH_POPULATION'})
		this.props.dispatch({type: 'FETCH_SNAPSHOT', payload: this.props.match.params.id})
		this.props.dispatch({type: 'FETCH_VALUES'})


		
		this.setState({
			snapshot: this.props.snapshotReducer
		})


	};//end componentDidMount

	generateLink = (urlid) => {
		let chance = new Chance();
		let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
		this.props.dispatch({type: 'NEW_URL', payload: {id: this.props.match.params.id, url: urlLink, urlId: urlid}})
	};//end generateLink

	handleEdit = () => {
		this.setState({
			isEditable: true
		})
		//need to set up separate editPartipcantReducer to handle any edits made to participant, this way
		//any changes can be made to the editParticpantReducer so if Cancel Edit button is clicked, 
		//participant will revert back to individualPartipcantReducer info and no changes are made to database
		this.props.dispatch({type: 'SET_EDIT_PARTICIPANT', payload: this.props.individual[0]})
	};//end handleEdit

	handleCancelEdit = () => {
		this.setState({
			isEditable: false
		})
		this.props.dispatch({type: 'CANCEL_EDIT_PARTICIPANT'})
	};//end handleCancelEdit

	handleInputChange = propertyName => event => {
		this.props.dispatch({type: 'EDIT_PARTICIPANT', payload: {property: propertyName, value: event.target.value}})
	};//end handleInputChange

	saveChanges = () => {
		this.props.dispatch({type: 'UPDATE_PARTICIPANT', payload: this.props.editParticipant})
		this.setState({
			isEditable: false
		})
	};//end handle saveChanges


	render(){
		const classes = this.props;
		console.log(this.props.snapshot[0]);

		let snap = this.props.snapshot[0];
		
		

		if (snap == true) {
		const keys = Object.keys(snap)
		console.log(keys)
		}
		// let id = this.props.snapshot[].map(id => {
		// 	return id
		// })

		// console.log(corevalues); 
		// let snapshot = this.props.snapshot[0].coreValues; 
		// let coreValues = snapshot.coreValues
		// let coreValues = this.props.snapshot.coreValues.map(value => {
		// 					return value
		// })

		// let violatorValues = snapshot.coreViolators
		// let violatorValues = this.props.coreViolators.map(value => {
		// 					return value
		// })

		
		
		return(
			<>
			{this.props.individual.map(person => {
				let formatExpiration = moment(person.expiration_date).format('YYYY-MM-DD')
				let today = new Date();
				let expirationDate = new Date(person.expiration_date)
				let urlButton;
				if (expirationDate >= today) {
					urlButton = <Tooltip title="Invite Link Isn't Expired!" placement="right"><Button variant="outlined" color="primary">Generate New URL</Button></Tooltip>
				} else {
					urlButton = <Button variant="contained" color="primary" onClick={() => this.generateLink(person.urlid)}>Generate New URL</Button>
				}
				
				return(
					<Grid key={person.id} className={classes.root}>
					<Card className={classes.card} >
						<CardContent>
							<h3>Participant: {person.first_name} {person.last_name}</h3>

								<TextField disabled label="First Name:" value={person.first_name} className={classes.text}/>

								<TextField disabled label="Last Name:" value={person.last_name} className={classes.text}/>

								<TextField disabled label="Age:" value={person.age} className={classes.text}/>

								<TextField disabled label="Gender:" value={person.gender} className={classes.text}/>

								<TextField disabled select label="Category:" value={person.category_id} className={classes.text} >
									{this.props.category.map(category => {
										return (
											<MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>
										)
									})}
								</TextField>

								<TextField disabled label="State:" value={person.state} className={classes.text}/>

								<TextField disabled label="Email Address:" value={person.email} className={classes.text}/>

								<TextField disabled label="Phone Number:" value={person.phone_number} className={classes.text}/>
								<br></br>

								{person.category_id === 1 &&
								<>
								<br></br>Offender Data:<br></br>

								<TextField disabled label="System:" select margin="normal" value={person.system} className={classes.menu}>
									{this.props.system.map((system) => {
										return(<MenuItem key={system.id} value={system.system}>{system.system}</MenuItem>)
									})}</TextField>

								<TextField disabled label="System ID#:" className={classes.text} value={person.system_id}/>

								<TextField disabled label="Population:" select margin="normal" value={person.population} className={classes.menu}>
									{this.props.population.map((population) => {
										return(<MenuItem key={population.id} value={population.population}>{population.population}</MenuItem>)
									})}</TextField>

								<TextField disabled select margin="normal" className={classes.menu} 
									label="Felony?:" value={person.felon}>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem></TextField>

								<TextField disabled select margin="normal" className={classes.menu}
									label="Violent Crime?:" value={person.violent_offender}>
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem></TextField>
								</>
								}								
								<br></br>
								<Button variant="contained" color="primary" onClick={this.handleEdit}>Edit Participant</Button>

						{/* DIALOG EDITABLE FIELDS:*/}

							<Dialog open={this.state.isEditable} onClose={this.handleCancelEdit} disableBackdropClick={true}>
								<DialogTitle>Editing Participant: {person.first_name} {person.last_name}</DialogTitle>
								<DialogContent>
									<TextField label="First Name:" onChange={this.handleInputChange('first_name')} defaultValue={person.first_name} className={classes.text}/>

									<TextField label="Last Name:" onChange={this.handleInputChange('last_name')} defaultValue={person.last_name} className={classes.text}/>

									<TextField label="Age:" type="number" onChange={this.handleInputChange('age')} defaultValue={person.age} className={classes.text}/>

									<TextField label="Gender:" select margin="normal" className={classes.menu}
									onChange={this.handleInputChange('gender')} value={this.props.editParticipant.gender} >
										<MenuItem value="M">Male</MenuItem>
										<MenuItem value="F">Female</MenuItem>
										<MenuItem value="Other">Other</MenuItem>
										<MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
									</TextField>

									<TextField label="Category:" select margin="normal" className={classes.menu}
										value={this.props.editParticipant.category_id} onChange={this.handleInputChange('category_id')} >
			                                {this.props.category.map((category) => {
			                                    return(
													<MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>
												)
			                                })}
			                        </TextField>

									<TextField select margin="normal" label="State:" value={this.props.editParticipant.state} 
										onChange={this.handleInputChange('state')} className={classes.menu}>
										{this.props.stateNames.map((stateName, i) => {
											return (
												<MenuItem key={i} value={stateName.abbr}>{stateName.full}</MenuItem>
											)
										})}
									</TextField>

								<TextField label="Email Address:" className={classes.text} defaultValue={person.email}/>

								<TextField label="Phone Number:" className={classes.text} defaultValue={person.phone_number}/>
								{person.category_id === 1 &&
            						<>
									<br></br>Offender Data:<br></br>

										<TextField label="System:" select margin="normal" className={classes.menu}
											value={this.props.editParticipant.offender_system_id} onChange={this.handleInputChange('offender_system_id')}>
											{this.props.system.map((system) => {
												return(<MenuItem key={system.id} value={system.id}>{system.system}</MenuItem>)
											})}
										</TextField>

										<TextField label="System ID#:" className={classes.text} defaultValue={person.system_id} onChange={this.handleInputChange('system_id')}/>

										<TextField label="Population:" select margin="normal" className={classes.menu}
											value={this.props.editParticipant.population_id} onChange={this.handleInputChange('population_id')}>
											{this.props.population.map((population) => {
												return(<MenuItem key={population.id} value={population.id}>{population.population}</MenuItem>)
											})}
										</TextField>

										<TextField select margin="normal" className={classes.menu}
											label="Felony?:" value={this.props.editParticipant.felon}
											onChange={this.handleInputChange('felon')} >
											<MenuItem value={true}>Yes</MenuItem>
											<MenuItem value={false}>No</MenuItem></TextField>

										<TextField select margin="normal" className={classes.menu}
											label="Violent Crime?:" value={this.props.editParticipant.violent_offender}
											onChange={this.handleInputChange('violent_offender')} >
											<MenuItem value={true}>Yes</MenuItem>
											<MenuItem value={false}>No</MenuItem></TextField>
									</>}
            
								</DialogContent>
									<DialogActions>
										<Button onClick={this.handleCancelEdit} color="primary">Cancel Edit</Button>
										<Button onClick={this.saveChanges} variant="contained" color="primary" >Save Changes</Button>
									</DialogActions>
							</Dialog>

						</CardContent>
					</Card>

					<Card className={classes.card}>
					URL Stuff:
					<br></br>
						<TextField disabled label="Invite Link:" value={`localhost:3000/#/quiz/${person.url}`} className={classes.urlText}/> 
						<CopyToClipboard text={`localhost:3000/#/quiz/${person.url}`}>
							<Button variant="outlined" color="primary">Copy URL to Clipboard</Button>
						</CopyToClipboard>
						
						<br></br>
						<TextField disabled label="Expiration Date:" value={formatExpiration}/>
						{urlButton}
					</Card>

					<h2>Snapshot Results</h2>
				
					{snap ?
					<>
						<h3>Three true beliefs : {snap.beliefs[0] + ' ' +
												  snap.beliefs[1] + ' ' +
												  snap.beliefs[2] }</h3>
						<h3>Percentile lived in core values : {snap.percent_core}</h3>
						<h3>Percentile lived in violator values :{snap.percent_violators}</h3>
						<h3>Core Values : {snap.core_values[0] + ' ' + 
							 snap.core_values[1] + ' ' + 
							 snap.core_values[2] + ' ' +
							 snap.core_values[3] + ' ' +
							 snap.core_values[4] }</h3>
						<h3>Violator Values : {snap.violator_values[0] + ' ' + 
							 snap.violator_values[1] + ' ' + 
							 snap.violator_values[2] + ' ' +
							 snap.violator_values[3] + ' ' +
							 snap.violator_values[4] }</h3>
					</>
						: <> </>}
				</Grid>
					)
				})}
			</>	
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  profile: state.profile,
  individual: state.individual,
  category: state.category,
  stateNames: state.stateNames,
  population: state.population,
  system: state.system,
  editParticipant: state.editParticipant,

  snapshot: state.snapshotReducer,



});

export default withStyles(styles)(connect(mapStateToProps)(IndividualParticipant));