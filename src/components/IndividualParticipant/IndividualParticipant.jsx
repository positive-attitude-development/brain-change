import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, Grid, TextField, Button, MenuItem} from '@material-ui/core';
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
	grid: {
		width: '75%',
	}
}

class IndividualParticipant extends Component{

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_INDIVIDUAL', payload: this.props.match.params.id})
	};//end componentDidMount

	render(){
		const classes = this.props;
		let offenderData;
		return(
			<Grid className={classes.grid}>
			{this.props.individual.map((person) => {
				if(person.category === 'Offender'){
					offenderData = 
					<>
					<br></br>Offender Data:<br></br>
						<TextField label="System:" defaultValue={person.offender_system_id} disabled/>

						<TextField label="System ID#:" defaultValue={person.system_id} disabled/>

						<TextField label="Violent:" defaultValue={person.violent_offender} disabled/>

						<TextField label="Felon:" defaultValue={person.felon} disabled/>

						<TextField label="Population:" defaultValue={person.population_id} disabled/>
					</>
				} else {
					offenderData = <div></div>
				}
				return(
					<Card raised className={classes.card} key={person.id}>
						<CardContent>
							<h3>Participant: {person.first_name} {person.last_name}</h3>

								<TextField label="First Name:" disabled defaultValue={person.first_name}/>

								<TextField label="Last Name:" defaultValue={person.last_name}/>

								<TextField label="Age:" defaultValue={person.age}/>

								<TextField label="Gender:" defaultValue={person.gender}/>

								<TextField label="Category:" defaultValue={person.category}/>

								<TextField label="Email Address:" defaultValue={person.email}/>

								<TextField label="Phone Number:" defaultValue={person.phone_number}/>
								<br></br>

								{offenderData}
						</CardContent>
						<CardActions>
							<Button variant="contained" color="primary" onClick={this.handleEdit}>Edit Participant</Button>
						</CardActions>
					</Card>
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
});

export default withStyles(styles)(connect(mapStateToProps)(IndividualParticipant));