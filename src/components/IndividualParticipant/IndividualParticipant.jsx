import React, {Component} from 'react';
import {connect} from 'react-redux';

class IndividualParticipant extends Component{

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_INDIVIDUAL', payload: this.props.match.params.id})
	}
	render(){
		return(
			<p>Individual Participant!</p>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  profile: state.profile,
  participant: state.participant,
});

export default connect(mapStateToProps)(IndividualParticipant);