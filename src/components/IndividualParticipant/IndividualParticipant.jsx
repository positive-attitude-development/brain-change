import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, Grid, TextField, Button, MenuItem, Paper, Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent} from '@material-ui/core';
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

	}
}

class IndividualParticipant extends Component{

	state = {
		urlLink: '',
		isEditable: false,
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_INDIVIDUAL', payload: this.props.match.params.id})
		//this.props.dispatch({type: 'FETCH_URL', payload: this.props.match.params.id})
		this.props.dispatch({type: 'FETCH_CATEGORY'})
		this.props.dispatch({type: 'FETCH_SYSTEM'})
		this.props.dispatch({type: 'FETCH_POPULATION'})
		//this.generateLink();
		this.checkExpirationDate();
	};//end componentDidMount

	checkExpirationDate = () => {

	};//end checkExpirationDate

	generateLink = () => {
		let chance = new Chance();
		console.log('generateLink')
		// if(this.state.urlLink === ''){
		// 	let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
		// 	console.log('urlLink:', urlLink)
		// 	this.setState({
		// 		urlLink: urlLink,
		// 	})
		// }
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

	handleInputChange = propertyName => (event) => {

	};//end handleInputChange

	render(){
		const classes = this.props;
		let offenderData;
		return(
			<Grid className={classes.grid}>
			{this.props.individual.map((person) => {
				let today = new Date();
				let expirationDate = new Date(person.expiration_date)
				if(expirationDate >= today){
					console.log('link not expired')
				}else{
					console.log('link expired')
				}
				return(
					<Grid key={person.id}>
					<Card raised className={classes.card} >
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

								{person.category === "Offender" &&
								<>
								<br></br>Offender Data:<br></br>

								<TextField disabled label="System:" select margin="normal" 
									value={person.system }>
									{this.props.system.map((system) => {
										return(<MenuItem key={system.id} value={system.system}>{system.system}</MenuItem>)
									})}</TextField>

								<TextField disabled label="System ID#:" defaultValue={person.system_id}/>

								<TextField disabled label="Population:" select margin="normal" 
									value={person.population }>
									{this.props.population.map((population) => {
										return(<MenuItem key={population.id} value={population.population}>{population.population}</MenuItem>)
									})}</TextField>

								<TextField disabled select margin="normal" 
									label="Felony?:" value={person.felon}
									onChange={this.handleInputChange('felon')} >
									<MenuItem value={true}>Yes</MenuItem>
									<MenuItem value={false}>No</MenuItem></TextField>

								<TextField disabled select margin="normal" 
									label="Violent Crime?:" value={person.violent_offender}
									onChange={this.handleInputChange('violent_offender')} >
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
									<TextField label="First Name:" defaultValue={person.first_name}/>

									<TextField label="Last Name:" defaultValue={person.last_name}/>

									<TextField label="Age:" type="number" defaultValue={person.age}/>

									<TextField label="Gender:" select margin="normal" onChange={this.handleInputChange('gender')} value={person.gender}>
										<MenuItem value="M">Male</MenuItem>
										<MenuItem value="F">Female</MenuItem>
										<MenuItem value="Other">Other</MenuItem>
										<MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
									</TextField>

									<TextField label="Category:" select margin="normal"
										value={person.category} onChange={this.handleInputChange('category')}>
			                                {this.props.category.map((category) => {
			                                    return(<MenuItem key={category.id} value={category.category}>{category.category}</MenuItem>)
			                                })}
			                        </TextField>

									<TextField label="Email Address:" defaultValue={person.email}/>

									<TextField label="Phone Number:" defaultValue={person.phone_number}/>
									{person.category == "Offender" &&
                						<>
										<br></br>Offender Data:<br></br>

											<TextField label="System:" select margin="normal" 
												value={person.system }>
												{this.props.system.map((system) => {
													return(<MenuItem key={system.id} value={system.system}>{system.system}</MenuItem>)
												})}</TextField>

											<TextField label="System ID#:" defaultValue={person.system_id}/>

											<TextField label="Population:" select margin="normal" 
												value={person.population }>
												{this.props.population.map((population) => {
													return(<MenuItem key={population.id} value={population.population}>{population.population}</MenuItem>)
												})}</TextField>

											<TextField select margin="normal" 
												label="Felony?:" value={person.felon}
												onChange={this.handleInputChange('felon')} >
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem></TextField>

											<TextField select margin="normal" 
												label="Violent Crime?:" value={person.violent_offender}
												onChange={this.handleInputChange('violent_offender')} >
												<MenuItem value={true}>Yes</MenuItem>
												<MenuItem value={false}>No</MenuItem></TextField>
										</>}
            
								</DialogContent>
									<DialogActions>
										<Button onClick={this.handleCancelEdit} color="primary">Cancel Edit</Button>
										<Button onClick={this.handleCancelEdit} color="primary">Save Changes</Button>
									</DialogActions>
							</Dialog>

						</CardContent>
					</Card>

					<Card className={classes.card} raised>
					URL Stuff:
					<br></br>
						<TextField disabled label="Invite Link:" defaultValue={person.url}/> <Button variant="outlined" color="primary">Copy URL</Button>
						<br></br>
						<TextField disabled label="Expiration Date:" defaultValue={person.expiration_date}/>
						<Button variant="contained" color="primary">Generate New URL</Button>
						{this.checkExpirationDate()}
					</Card>

					<Card>
						<CardContent>
							IMAGINE SNAPSHOT HERE
						</CardContent>
					</Card>
				</Grid>
					)
				})}
				


			</Grid>	
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