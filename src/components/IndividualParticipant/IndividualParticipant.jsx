import React, {Component} from 'react';
import {connect} from 'react-redux';

class IndividualParticipant extends Component{
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