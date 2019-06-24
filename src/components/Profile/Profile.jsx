import React, {Component} from 'react';
import {connect} from 'react-redux';

class Profile extends Component{
	render(){
		return(
			<p>Profile page!</p>
		)
	}
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Profile);