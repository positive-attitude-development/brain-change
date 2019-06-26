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
		category: '',
	}

	componentDidMount(){
		this.props.dispatch({type:'FETCH_PARTICIPANTS'})
		this.props.dispatch({type: 'FETCH_CATEGORY'})
	};//end componentDidMount

	renderInputs = () =>{
		let input;
		if(this.state.category === "Offender"){
			input =
			<>
			<h4>Offender Data:</h4>
			<FormControlLabel control={<TextField />}
			label="System:" labelPlacement="start"/>

			<FormControlLabel control={<TextField />}
			label="Population:" labelPlacement="start"/>

			<FormControlLabel control={<TextField />}
			label="Felony:" labelPlacement="start"/>

			<FormControlLabel control={<TextField />}
			label="Violent:" labelPlacement="start"/>

			<FormControlLabel control={<TextField />}
			label="System ID #:" labelPlacement="start"/>
			</>
		}
		return input;
	};//end renderInputs

	setCategory = (event) =>{
		this.setState({
			category: event.target.value
		})
	};//end setCategory

	viewParticipant = (id) =>{
		//console.log('viewParticipant id:', id)
		this.props.history.push(`/individualparticipant/${id}`)

	};//end viewParticipant

	render(){
		const {classes} = this.props;
		return(
			<div>
				<Card className={classes.card}>
					<CardContent>
						Add a Participant:
						<br></br>

						<FormControlLabel control={<TextField />}
        				label="First Name:" labelPlacement="start"/>

						<FormControlLabel control={<TextField />}
        				label="Last Name:" labelPlacement="start"/>

						<FormControlLabel control={<TextField />}
        				label="Age:" labelPlacement="start"/>

						<FormControlLabel control={<TextField />}
        				label="Gender:" labelPlacement="start"/>

						
							<Select value={this.state.category} onChange={this.setCategory}>
								{this.props.category.map((category) => {
									return(
										<MenuItem key={category.id} value={category.category}>{category.category}</MenuItem>
									)
								})}
							</Select>

						<Select>
							<MenuItem>OPTION</MenuItem>
							<MenuItem>OPTION</MenuItem>
							<MenuItem>OPTION</MenuItem>
						</Select>
						<br></br>
						<select>
							<option>OPTION1</option>
							<option>OPTION2</option>
							<option>OPTION3</option>
						</select>

						<FormControlLabel control={<TextField />}
        				label="State:" labelPlacement="start"/>

						<FormControlLabel control={<TextField />}
        				label="Email Address:" labelPlacement="start"/>

						<FormControlLabel control={<TextField />}
        				label="Phone Number:" labelPlacement="start"/>

						{this.renderInputs()}
					</CardContent>
					<CardActions>
						<Button variant="contained" color="primary" disabled>Add Participant</Button>
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
});

export default withStyles(styles)(connect(mapStateToProps)(MyParticipants));