import React, {Component} from 'react';
import {connect} from 'react-redux';

class MyParticipants extends Component{
	render(){
		return(
			<div>
				<p>My Participants!</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(MyParticipants);