import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserPage extends Component{

  render(){
	return(
		<p>User Page</p>
	)
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(UserPage);
