import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, Grid, TextField, Button, FormControlLabel} from '@material-ui/core';
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
						<FormControlLabel control={<TextField defaultValue={person.offender_system_id}/>}
						label="Age:" labelPlacement="start"/>

						<FormControlLabel control={<TextField defaultValue={person.system_id}/>}
						label="Gender:" labelPlacement="start"/>

						<FormControlLabel control={<TextField defaultValue={person.violent_offender}/>}
						label="Category:" labelPlacement="start"/>

						<FormControlLabel control={<TextField defaultValue={person.felon}/>}
						label="Email Address:" labelPlacement="start"/>

						<FormControlLabel control={<TextField defaultValue={person.population_id}/>}
						label="Phone Number:" labelPlacement="start"/>
					</>
				} else {
					offenderData = <div>NO OFFENDER DATA</div>
				}
				return(
					<Card raised className={classes.card} key={person.id}>
						<CardContent>
							<h3>Participant: {person.first_name} {person.last_name}</h3>

								<FormControlLabel control={<TextField defaultValue={person.first_name}/>}
        						label="First Name:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={person.last_name}/>}
        						label="Last Name:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={person.age}/>}
        						label="Age:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={person.gender}/>}
        						label="Gender:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={person.category}/>}
        						label="Category:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={person.email}/>}
        						label="Email Address:" labelPlacement="start"/>

								<FormControlLabel control={<TextField defaultValue={person.phone_number}/>}
        						label="Phone Number:" labelPlacement="start"/>

								{offenderData}
						</CardContent>
						<CardActions>
							<Button>Edit Participant</Button>
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
  individual: state.individual
});

export default withStyles(styles)(connect(mapStateToProps)(IndividualParticipant));