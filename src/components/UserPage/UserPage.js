import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserPage extends Component{

  render(){
	  //due to weird occasional routing issue, sometimes if users hit back button they are routed to UserPage
	  //so leaving this in to route them back to appropriate "home" based on access level
	if(this.props.admin.level === 1){
		this.props.history.push('/info')
	}else if(this.props.admin.level === 2){
		this.props.history.push('/profile')
	}else if(this.props.admin.level === 3){
		this.props.history.push('/myparticipants')
	}else if(this.props.admin.level >= 4){
		this.props.history.push('/allparticipants')
	}
	return(
		<div>

		</div>
	)
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(UserPage);
