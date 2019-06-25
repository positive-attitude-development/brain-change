import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, TextField, Button, FormControlLabel, Table, TableBody, TableHead, TableCell, TableRow} from '@material-ui/core';
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

	componentDidMount(){
		this.props.dispatch({type: ''})
	}

	render(){
		const {classes} = this.props;
		let offenderInputs;
		return(
			<div>
				<Card className={classes.card}>
					<CardContent>
						Add a Participant:
						<br></br>

						<FormControlLabel control={
          					<TextField />}
        				label="First Name:"
						labelPlacement="start"/>

						<FormControlLabel control={
          					<TextField />}
        				label="Last Name:"
						labelPlacement="start"/>

						<FormControlLabel control={
          					<TextField />}
        				label="Age:"
						labelPlacement="start"/>

						<FormControlLabel control={
          					<TextField />}
        				label="Gender:"
						labelPlacement="start"/>

						<FormControlLabel control={
          					<TextField />}
        				label="Category:"
						labelPlacement="start"/>

						<FormControlLabel control={
          					<TextField />}
        				label="State:"
						labelPlacement="start"/>

						<FormControlLabel control={
          					<TextField />}
        				label="Email Address:"
						labelPlacement="start"/>

						<FormControlLabel control={
          					<TextField />}
        				label="Phone Number:"
						labelPlacement="start"/>
					</CardContent>
					<CardActions>
						<Button variant="contained" color="primary" disabled>Add Participant</Button>
					</CardActions>
				</Card>
	
	<h3>My Participants:</h3>
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
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
				{this.props.participants.map((person) => {
					return(
						<TableRow key={person.id}>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
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
  state
});

export default withStyles(styles)(connect(mapStateToProps)(MyParticipants));