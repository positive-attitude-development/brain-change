import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, TextField, Button, FormControlLabel, Table, TableBody, TableHead, TableCell, TableRow, Select, MenuItem} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {

	},
	card: {
		margin: 'auto',
		marginTop: '30px',
		marginBottom: '40px',
		width: '75%',
	},
	table: {
		margin: 'auto',
		width: '75%',
	},
}

class MyParticipants extends Component{
	state = {
		first_name: '',
		last_name: '',
		age: '',
		gender: '',
		category: '',
		state: '',
		email_address: '',
		phone_number: '',
		system_id: '',
		offender_system_id: '',
		felon: '',
		violent_offender: '',
		population_id: ''
	}

	componentDidMount(){
		this.props.dispatch({type:'FETCH_PARTICIPANTS'})
		this.props.dispatch({type: 'FETCH_CATEGORY'})
	};//end componentDidMount

	handleInputChange = propertyName => (event) => {
	    this.setState({
	      [propertyName]: event.target.value,
	    });
	};//end handleInputChange

	handleSubmit = () => {
		console.log('submitted')
	};//end handleSubmit

	renderInputs = () =>{
		let input;
		if(this.state.category === "Offender"){
			input =
			<>
			Offender Data: 
			<FormControlLabel control={<TextField onChange={this.handleInputChange('offender_system_id')}/>}
			label="System:" labelPlacement="start"/>

			<FormControlLabel control={<TextField onChange={this.handleInputChange('population_id')}/>}
			label="Population:" labelPlacement="start"/>

			<FormControlLabel control={<TextField onChange={this.handleInputChange('felon')}/>}
			label="Felony:" labelPlacement="start"/>

			<FormControlLabel control={<TextField onChange={this.handleInputChange('violent_offender')}/>}
			label="Violent:" labelPlacement="start"/>

			<FormControlLabel control={<TextField onChange={this.handleInputChange('system_id')}/>}
			label="System ID #:" labelPlacement="start"/>
			</>
		}
		return input;
	};//end renderInputs

	viewParticipant = (id) =>{
		this.props.history.push(`/individualparticipant/${id}`)
	};//end viewParticipant

	render(){
		const {classes} = this.props;
		let submitButton;
		if(this.state.first_name !== '' && this.state.last_name !== ''
		&& this.state.age !== '' && this.state.gender !== '' && this.state.category !== ''
		&& this.state.category !== "Offender" && this.state.state !== ''){
			console.log('OK to submit non offender')
			submitButton = <Button variant="contained" color="primary">Add Participant</Button>
		}else if(this.state.first_name !== '' && this.state.last_name !== ''
		&& this.state.age !== '' && this.state.gender !== ''
		&& this.state.category === "Offender" && this.state.state !== ''
		&& this.state.system_id !== '' && this.state.offender_system_id !== ''
		&& this.state.felon !== '' && this.state.violent_offender !== '' && this.state.population_id !== ''){
			console.log('OK to submit offender')
			submitButton = <Button variant="contained" color="primary">Add Participant</Button>
		}else{
			console.log('Not OK to submit participant yet')
			submitButton = <Button variant="contained" color="primary" disabled>Add Participant</Button>
		}
		return(
			<div>
				<Card className={classes.card}>
					<CardContent>
						<h3>Add a Participant:</h3>
						{/* I made this h5 disclaimer because you have to use different Material-UI label things on text
						fields than on selects, and they of course are not styled the same so it looked weird... */}
						<h5>(Unless specified, all fields are required)</h5>
						<br></br>

						<FormControlLabel control={<TextField onChange={this.handleInputChange('first_name')}/>}
        				label="First Name:" labelPlacement="start"/>

						<FormControlLabel control={<TextField onChange={this.handleInputChange('last_name')}/>}
        				label="Last Name:" labelPlacement="start"/>

						<FormControlLabel control={<TextField onChange={this.handleInputChange('age')}/>}
        				label="Age:" labelPlacement="start"/>

						<FormControlLabel control={<TextField onChange={this.handleInputChange('gender')}/>}
        				label="Gender:" labelPlacement="start"/>


						<FormControlLabel control={
                            <Select value={this.state.category}
							onChange={this.handleInputChange('category')}>
                                {this.props.category.map((category) => {
                                    return(
                                        <MenuItem key={category.id} value={category.category}>{category.category}</MenuItem>
                                    )
                                })}
                            </Select>}
                    	label="Category:" labelPlacement="start"/>

						<FormControlLabel control={
							<Select value={this.state.state}
								onChange={this.handleInputChange('state')}>
								<MenuItem value=""><em>Select State</em></MenuItem>
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
							</Select>}
				        	label="State:" labelPlacement="start"/>


						<FormControlLabel control={<TextField helperText="*Optional"
							onChange={this.handleInputChange('email_address')}/>}
        				label="Email Address:" labelPlacement="start"/>

						<FormControlLabel control={<TextField helperText="*Optional"
							onChange={this.handleInputChange('phone_number')}/>}
        				label="Phone Number:" labelPlacement="start"/>

						{this.renderInputs()}
					</CardContent>
					<CardActions>
						{submitButton}
					</CardActions>
				</Card>
	
	<h3>My Participants:</h3>
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>First Name</TableCell>
					<TableCell>Last Name</TableCell>
					<TableCell>Age</TableCell>
					<TableCell>Gender</TableCell>
					<TableCell>Category</TableCell>
					<TableCell>State</TableCell>
					<TableCell>Email Address</TableCell>
					<TableCell>Phone Number</TableCell>
					<TableCell>View/Edit Participant</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{this.props.participant.map((person) => {
					return(
						<TableRow key={person.id}>
							<TableCell>{person.first_name}</TableCell>
							<TableCell>{person.last_name}</TableCell>
							<TableCell>{person.age}</TableCell>
							<TableCell>{person.gender}</TableCell>
							<TableCell>{person.category}</TableCell>
							<TableCell>{person.state}</TableCell>
							<TableCell>{person.email}</TableCell>
							<TableCell>{person.phone_number}</TableCell>
							<TableCell><Button variant="contained" color="primary" onClick={()=>this.viewParticipant(`${person.id}`)}>View/Edit</Button></TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  profile: state.profile,
  participant: state.participant,
  category: state.category,
  addParticipant: state.addParticipant,
});

export default withStyles(styles)(connect(mapStateToProps)(MyParticipants));