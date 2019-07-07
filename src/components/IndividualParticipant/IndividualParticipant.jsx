import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, Tooltip, TextField, Button, MenuItem, Dialog, DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Chance} from 'chance';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import moment from 'moment';
import SnapShot from '../QuizViews/FinalResults/SnapShot'

const styles = {
	root: {

	},
	buttonArea: {
		marginTop: '30px',
	},
	card: {
		margin: '30px auto',
		width: '90%',
	},
	menu: {
		marginTop: '5px',
		marginLeft: '5px',
		width: '150px',
	},
	menuXL: {
		marginTop: '5px',
		marginLeft: '5px',
		width: '250px',
	},
	text: {
		marginRight: '30px',
	},
	urlText: {
		width: '200px',
	}
}

class IndividualParticipant extends Component{

	state = {
		isEditable: false,
	}

	componentDidMount(){

		this.props.dispatch({type: 'FETCH_INDIVIDUAL', payload: this.props.match.params.id});
		this.props.dispatch({type: 'FETCH_CATEGORY'});
		this.props.dispatch({type: 'FETCH_SYSTEM'});
		this.props.dispatch({type: 'FETCH_POPULATION'});
		this.props.dispatch({type: 'FETCH_SNAPSHOT', payload: this.props.match.params.id});
    this.props.dispatch({type: 'FETCH_VALUES'})
	}; //end componentDidMount

	generateLink = urlid => {
    
		let chance = new Chance();
		let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
		this.props.dispatch({type: 'NEW_URL', payload: {id: this.props.match.params.id, url: urlLink, urlId: urlid}})
	}; //end generateLink

	handleEdit = () => {
		this.setState({ isEditable: true });
		//need to set up separate editPartipcantReducer to handle any edits made to participant, this way any changes can be made to the editParticpantReducer so if Cancel Edit button is clicked, participant will revert back to individualPartipcantReducer info and no changes are made to database
		this.props.dispatch({type: 'SET_EDIT_PARTICIPANT', payload: this.props.individual[0]})
	}; //end handleEdit

	handleCancelEdit = () => {
		this.setState({ isEditable: false });
		this.props.dispatch({type: 'CANCEL_EDIT_PARTICIPANT'});
	}; //end handleCancelEdit

	handleDelete = () => {
		Swal.fire({
			title: `Delete ${this.props.individual[0].first_name}?`,
			text: 'This action cannot be undone.',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, Delete'
		}).then(result => {
			if (result.value) {
				this.props.dispatch({type: 'DELETE_PARTICIPANT', payload: this.props.individual[0]});
				this.props.history.push('/myparticipants');
				Swal.fire(
					'Deleted!',
					'',
					'success'
				)
			}
		})
	}; //end handleDelete

	handleInputChange = propertyName => event => {
		this.props.dispatch({type: 'EDIT_PARTICIPANT', payload: {property: propertyName, value: event.target.value}});
	}; //end handleInputChange

	saveChanges = () => {
		this.props.dispatch({type: 'UPDATE_PARTICIPANT', payload: this.props.editParticipant});
		this.setState({ isEditable: false });
	}; //end handle saveChanges


	render() {
		const {classes} = this.props;

		let person = this.props.individual[0] || 
			{
				expiration_date: '00-00-00'
			};
		let formatExpiration = moment(person.expiration_date).format('YYYY-MM-DD')
		let today = new Date();
		let expirationDate = new Date(person.expiration_date)
		
		let urlButton;

		if (expirationDate >= today) {
			urlButton = <Tooltip title="Invite Link Isn't Expired!" placement="right"><Button color="primary" size="large">Generate New Link</Button></Tooltip>
		} else {
			urlButton = <Button variant="contained" color="primary" size="large" onClick={() => this.generateLink(person.urlid)}>Generate New Link</Button>
		}
				
		return(
			<div>
				{this.props.individual[0] &&
					<div>
					<Card raised className={classes.card}>
						<CardContent>
							<h3>Participant: {person.first_name} {person.last_name}</h3>
							<h5>General Information:</h5>
							<span className={classes.text}>Age: {person.age}</span>
							<span className={classes.text}>Gender: {person.gender}</span>
							{this.props.category.map(category => {
								if (category.id === person.category_id) {
									return <span className={classes.text}>Category: {category.category}</span>
								}
							})}
							<span className={classes.text}>State: {person.state}</span>
							<span className={classes.text}>Email Address: {person.email}</span>
							<span className={classes.text}>Phone Number: {person.phone_number}</span>

							{person.category_id === 1 &&
								<div>
									<h5>Offender Information:</h5>
									{this.props.system.map(system => {
										if (system.system === person.system) {
											return <span className={classes.text}>System: {person.system}</span>
										}
									})}
									<span className={classes.text}>System ID: {person.system_id}</span>
									{this.props.population.map(population => {
										if (population.population === person.population) {
											return <span className={classes.text}>Population: {person.population}</span>
										}
									})}
									{person.felon ? <span className={classes.text}>Felon: Yes</span> : <span className={classes.text}>Felon: No</span>}
									{person.violent_offender ? <span className={classes.text}>Violent Offender: Yes</span> : <span className={classes.text}>Violent Offender: No</span>}
								</div>
							}

							<div className={classes.buttonArea}>

								<Button className={classes.text} variant="contained" color="primary" size="large" onClick={this.handleEdit}>Edit Participant</Button>
							
								{/* remove button only available to assigned admin */}
								{this.props.admin.id === this.props.individual[0].admin_id &&
									<Button variant="contained" color="secondary" size="large" onClick={this.handleDelete}>Remove Participant</Button>
								}
							</div>

							{/* DIALOG EDITABLE FIELDS:*/}

							<Dialog open={this.state.isEditable} onClose={this.handleCancelEdit} disableBackdropClick={true}>

								<DialogTitle>Editing Participant: {person.first_name} {person.last_name}
								</DialogTitle>

								<DialogContent>
									<h5>General Information:</h5>
									<TextField label="First Name:" onChange={this.handleInputChange('first_name')} defaultValue={person.first_name} className={classes.menu} />

									<TextField label="Last Name:" onChange={this.handleInputChange('last_name')} defaultValue={person.last_name} className={classes.menu} />

									<TextField label="Age:" type="number" onChange={this.handleInputChange('age')} defaultValue={person.age} className={classes.menu} />

									<TextField label="Gender:" select className={classes.menu} onChange={this.handleInputChange('gender')} value={this.props.editParticipant.gender} >
										<MenuItem value="M">Male</MenuItem>
										<MenuItem value="F">Female</MenuItem>
										<MenuItem value="Other">Other</MenuItem>
										<MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
									</TextField>

									<TextField label="Category:" select className={classes.menu} value={this.props.editParticipant.category_id} onChange={this.handleInputChange('category_id')} >
										{this.props.category.map(category => {
											return (
												<MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>
											)
										})}
									</TextField>

									<TextField select label="State:" value={this.props.editParticipant.state} onChange={this.handleInputChange('state')} className={classes.menu}>
										{this.props.stateNames.map((stateName, i) => {
											return (
												<MenuItem key={i} value={stateName.abbr}>{stateName.full}</MenuItem>
											)
										})}
									</TextField>

									<TextField label="Email Address:" className={classes.menu} defaultValue={person.email} />

									<TextField label="Phone Number:" className={classes.menu} defaultValue={person.phone_number} />

									{person.category_id === 1 &&
										<>
											<h5>Offender Information:</h5>

											<TextField label="System:" select margin="normal" className={classes.menu}
												value={this.props.editParticipant.offender_system_id} onChange={this.handleInputChange('offender_system_id')}>
												{this.props.system.map((system) => {
													return (<MenuItem key={system.id} value={system.id}>{system.system}</MenuItem>)
												})}
											</TextField>

											<TextField label="System ID#:" className={classes.menu} defaultValue={person.system_id} onChange={this.handleInputChange('system_id')} />

											<TextField label="Population:" select margin="normal" className={classes.menu}
												value={this.props.editParticipant.population_id} onChange={this.handleInputChange('population_id')}>
												{this.props.population.map((population) => {
													return (<MenuItem key={population.id} value={population.id}>{population.population}</MenuItem>)
												})}
											</TextField>

											<TextField select margin="normal" className={classes.menu}
												label="Felony?:" value={this.props.editParticipant.felon}
												onChange={this.handleInputChange('felon')} >
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</TextField>

											<TextField select margin="normal" className={classes.menu}
												label="Violent Crime?:" value={this.props.editParticipant.violent_offender}
												onChange={this.handleInputChange('violent_offender')} >
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem>
											</TextField>
										</>
									}
			
								</DialogContent>

								<DialogActions>
									<Button onClick={this.handleCancelEdit} color="primary" size="large">Cancel Edit</Button>
									<Button onClick={this.saveChanges} variant="contained" color="primary" size="large">Save Changes</Button>
								</DialogActions>

							</Dialog>
						</CardContent>
					</Card>

					<Card raised className={classes.card}>
						<CardContent>
							<h3>Invite to Assessment:</h3>
							<span class={classes.text}>Unique Invite Link: localhost:3000/#/quiz/{person.url}</span>
							<span className={classes.text}>Expiration Date: {formatExpiration}</span>
							<div className={classes.buttonArea}>
								<CopyToClipboard text={`localhost:3000/#/quiz/${person.url}`}>
									<Button className={classes.text} variant="contained" color="primary" size="large">Copy Link to Clipboard</Button>
								</CopyToClipboard>
								{urlButton}
							</div>
						</CardContent>
					</Card>

					<Card raised className={classes.card}>
						<CardContent>
							<h3>Assessment Snapshot:</h3>
							{this.props.snapshot[0] && <h5>Date Taken: {this.props.snapshot[0].dates}</h5>}
							{this.props.snapshot[0] && <SnapShot />}
						</CardContent>
					</Card>
					
					</div>
				}
			</div>
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
  snapshot: state.snapshotReducer

});

export default withStyles(styles)(connect(mapStateToProps)(IndividualParticipant));