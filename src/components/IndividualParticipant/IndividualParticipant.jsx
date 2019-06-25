import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, TextField, Button, FormControlLabel} from '@material-ui/core';

class IndividualParticipant extends Component{

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_INDIVIDUAL', payload: this.props.match.params.id})
	}
	render(){
		return(
			<>
			{this.props.individual.map((person) => {
				return(
					<Card key={person.id}>
						<p>Individual Participant!</p>
						<CardContent>
							Name: {person.first_name} {person.last_name}

							
						</CardContent>
						<CardActions>

						</CardActions>
					</Card>
					)
				})}
			</>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  profile: state.profile,
  individual: state.individual
});

export default connect(mapStateToProps)(IndividualParticipant);