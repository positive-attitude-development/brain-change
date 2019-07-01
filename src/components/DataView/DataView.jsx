import React, {Component} from 'react';
import {connect} from 'react-redux';


class DataView extends Component{
	render(){
		return(
			<p>Data stuff!</p>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(DataView);